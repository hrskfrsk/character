// Static Site Generation for Character Sheets
// Node.js script to pre-generate character pages

const fs = require('fs');
const path = require('path');

// Firebase Admin SDK (for server-side access)
const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        // Your Firebase config here
    });
}

const db = admin.firestore();

async function generateStaticCharacterPage(characterId) {
    try {
        console.log(`Generating static page for character: ${characterId}`);
        
        // Get character data from Firestore
        const doc = await db.collection('characters').doc(characterId).get();
        
        if (!doc.exists) {
            throw new Error('Character not found');
        }
        
        const characterData = doc.data();
        
        // Read the template HTML
        const templatePath = path.join(__dirname, 'character-template.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
        
        // Inject character data into the template
        const dataScript = `
            <script>
                // Pre-embedded character data for instant loading
                window.__CHARACTER_DATA__ = ${JSON.stringify(characterData)};
            </script>
        `;
        
        // Insert the data script before closing head tag
        htmlTemplate = htmlTemplate.replace('</head>', `${dataScript}</head>`);
        
        // Update page title and meta tags
        const characterName = characterData.character_name || 'キャラクター';
        htmlTemplate = htmlTemplate.replace(
            '<title>キャラクターシート</title>',
            `<title>${characterName} - キャラクターシート</title>`
        );
        
        // Add meta description
        const metaDescription = `<meta name="description" content="${characterName}のキャラクターシート">`;
        htmlTemplate = htmlTemplate.replace('</head>', `${metaDescription}</head>`);
        
        // Generate output filename
        const outputPath = path.join(__dirname, 'generated', `${characterId}.html`);
        
        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Write the generated HTML
        fs.writeFileSync(outputPath, htmlTemplate);
        
        console.log(`✅ Static page generated: ${outputPath}`);
        return outputPath;
        
    } catch (error) {
        console.error(`❌ Error generating static page for ${characterId}:`, error);
        throw error;
    }
}

// Batch generation for multiple characters
async function generateAllCharacterPages() {
    try {
        console.log('🚀 Starting batch generation of character pages...');
        
        // Get all characters (you might want to add pagination for large datasets)
        const snapshot = await db.collection('characters').get();
        
        const generatePromises = [];
        snapshot.forEach(doc => {
            generatePromises.push(generateStaticCharacterPage(doc.id));
        });
        
        const results = await Promise.allSettled(generatePromises);
        
        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;
        
        console.log(`✅ Batch generation complete: ${successful} successful, ${failed} failed`);
        
    } catch (error) {
        console.error('❌ Batch generation failed:', error);
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage:');
        console.log('  node generate-static.js <character-id>  # Generate single character');
        console.log('  node generate-static.js --all           # Generate all characters');
        process.exit(1);
    }
    
    if (args[0] === '--all') {
        generateAllCharacterPages();
    } else {
        const characterId = args[0];
        generateStaticCharacterPage(characterId);
    }
}

module.exports = {
    generateStaticCharacterPage,
    generateAllCharacterPages
};