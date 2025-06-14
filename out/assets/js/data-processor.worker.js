// Web Worker for processing character data
self.onmessage = function(e) {
    const { type, data } = e.data;
    
    switch (type) {
        case 'PROCESS_CHARACTER_DATA':
            try {
                const processedData = processCharacterData(data);
                self.postMessage({
                    type: 'PROCESS_COMPLETE',
                    data: processedData
                });
            } catch (error) {
                self.postMessage({
                    type: 'PROCESS_ERROR',
                    error: error.message
                });
            }
            break;
            
        case 'PROCESS_EQUIPMENT_DATA':
            try {
                const processedEquipment = processEquipmentData(data);
                self.postMessage({
                    type: 'EQUIPMENT_COMPLETE',
                    data: processedEquipment
                });
            } catch (error) {
                self.postMessage({
                    type: 'EQUIPMENT_ERROR',
                    error: error.message
                });
            }
            break;
    }
};

function processCharacterData(data) {
    // キャラクターデータの重い処理をここで実行
    const processed = { ...data };
    
    // 技能データの計算
    const skillTypes = ['combat', 'exploration', 'action', 'negotiation', 'knowledge'];
    
    skillTypes.forEach(skillType => {
        const skills = [];
        for (const [key, value] of Object.entries(data)) {
            if (key.startsWith(`additional_${skillType}_`) && key.endsWith('_name') && value && value.trim() !== '') {
                const skillId = key.replace('_name', '');
                const skillData = {
                    id: skillId,
                    name: value,
                    total: data[skillId + '_total'] || '0',
                    initial: data[skillId + '_initial'] || '0',
                    job: data[skillId + '_job'] || '0',
                    interest: data[skillId + '_interest'] || '0',
                    growth: data[skillId + '_growth'] || '0',
                    other: data[skillId + '_other'] || '0'
                };
                
                const hasNonZeroValues =
                    parseInt(skillData.total) > 0 ||
                    parseInt(skillData.job) > 0 ||
                    parseInt(skillData.interest) > 0 ||
                    parseInt(skillData.growth) > 0 ||
                    parseInt(skillData.other) > 0;
                
                if (hasNonZeroValues) {
                    skills.push(skillData);
                }
            }
        }
        processed[`processed_${skillType}_skills`] = skills;
    });
    
    return processed;
}

function processEquipmentData(equipmentData) {
    if (!equipmentData) return null;
    
    const processed = {};
    const equipmentTypes = ['weapons', 'items', 'disorders', 'books', 'spells', 'artifacts', 'entities'];
    
    equipmentTypes.forEach(type => {
        if (equipmentData[type] && equipmentData[type].length > 0) {
            processed[type] = equipmentData[type].map(item => ({
                ...item,
                processed: true,
                displayReady: true
            }));
        }
    });
    
    return processed;
}