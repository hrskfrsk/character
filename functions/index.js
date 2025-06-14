// Firebase Functions for automatic static generation
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

admin.initializeApp();

// Trigger static generation when character is saved
exports.generateStaticOnSave = functions.firestore
    .document('characters/{characterId}')
    .onWrite(async (change, context) => {
        const characterId = context.params.characterId;
        
        // Skip if document was deleted
        if (!change.after.exists) {
            console.log(`Character ${characterId} was deleted, skipping static generation`);
            return null;
        }
        
        try {
            const characterData = change.after.data();
            await generateStaticCharacterPage(characterId, characterData);
            
            console.log(`✅ Static page generated for character: ${characterId}`);
            return null;
            
        } catch (error) {
            console.error(`❌ Failed to generate static page for ${characterId}:`, error);
            return null;
        }
    });

// HTTP function for on-demand generation
exports.generateStatic = functions.https.onRequest(async (req, res) => {
    try {
        const characterId = req.query.id;
        
        if (!characterId) {
            res.status(400).json({ error: 'Character ID is required' });
            return;
        }
        
        // Get character data
        const doc = await admin.firestore().collection('characters').doc(characterId).get();
        
        if (!doc.exists) {
            res.status(404).json({ error: 'Character not found' });
            return;
        }
        
        const characterData = doc.data();
        const outputPath = await generateStaticCharacterPage(characterId, characterData);
        
        res.json({ 
            success: true, 
            message: 'Static page generated successfully',
            path: outputPath 
        });
        
    } catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function generateStaticCharacterPage(characterId, characterData) {
    // Read template from Cloud Storage or embed it in the function
    const htmlTemplate = getHTMLTemplate();
    
    // Inject character data
    const dataScript = `
        <script>
            window.__CHARACTER_DATA__ = ${JSON.stringify(characterData)};
        </script>
    `;
    
    let modifiedHTML = htmlTemplate.replace('</head>', `${dataScript}</head>`);
    
    // Update page title
    const characterName = characterData.character_name || 'キャラクター';
    modifiedHTML = modifiedHTML.replace(
        '<title>キャラクターシート</title>',
        `<title>${characterName} - キャラクターシート</title>`
    );
    
    // Store the generated HTML in Cloud Storage
    const bucket = admin.storage().bucket();
    const file = bucket.file(`static-pages/${characterId}.html`);
    
    await file.save(modifiedHTML, {
        metadata: {
            contentType: 'text/html',
            cacheControl: 'public, max-age=3600' // 1 hour cache
        }
    });
    
    return `static-pages/${characterId}.html`;
}

function getHTMLTemplate() {
    // In a real implementation, you'd read this from Cloud Storage
    // or include it as a resource in your function
    return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>キャラクターシート</title>
        <!-- Your CSS and other head content -->
    </head>
    <body>
        <!-- Your character sheet HTML template -->
    </body>
    </html>
    `;
}

// Batch generation for existing characters
exports.batchGenerate = functions.https.onRequest(async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('characters').get();
        const results = [];
        
        for (const doc of snapshot.docs) {
            try {
                await generateStaticCharacterPage(doc.id, doc.data());
                results.push({ id: doc.id, status: 'success' });
            } catch (error) {
                results.push({ id: doc.id, status: 'error', error: error.message });
            }
        }
        
        res.json({ 
            message: 'Batch generation completed',
            results: results 
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});