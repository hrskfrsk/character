import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllCharacterData } from '../../lib/firebase-admin';
import { linkifyText } from '../../lib/text-utils';

interface RecordPageProps {
  recordSection: any;
  characterName: string;
  sectionTitle: string;
}

export default function RecordPage({ recordSection, characterName, sectionTitle }: RecordPageProps) {
  const router = useRouter();

  if (!recordSection) {
    return (
      <div>
        <Head>
          <title>記録が見つかりません</title>
        </Head>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>記録が見つかりません</h1>
          <p>指定された記録は存在しません。</p>
          <button 
            onClick={() => router.back()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  const pageTitle = `${sectionTitle} - ${characterName} - CoC6版キャラクターシート`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`${characterName}の${sectionTitle}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {/* ヘッダー */}
          <div style={{ marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
            <h1 style={{ 
              fontSize: '24px', 
              marginBottom: '8px',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-clipboard"></i>
              {sectionTitle}
            </h1>
            <p style={{ 
              color: '#666', 
              fontSize: '14px',
              margin: 0
            }}>
              キャラクター: {characterName}
            </p>
          </div>

          {/* 記録内容 */}
          <div className="record-content">
            {recordSection.fields.map((field: any) => (
              <div key={field.id} style={{ marginBottom: '25px' }}>
                {field.title && (
                  <h2 style={{ 
                    fontSize: '18px',
                    fontWeight: 'bold', 
                    marginBottom: '8px', 
                    color: '#333',
                    borderLeft: '4px solid #2196F3',
                    paddingLeft: '12px'
                  }}>
                    {field.title}
                  </h2>
                )}
                <div style={{
                  lineHeight: '1.8',
                  color: '#444',
                  fontSize: '16px',
                  whiteSpace: 'pre-wrap',
                  backgroundColor: '#fafafa',
                  padding: '15px',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0'
                }}>
                  {linkifyText(field.content)}
                </div>
              </div>
            ))}
          </div>

          {/* フッター */}
          <div style={{
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid #eee',
            textAlign: 'center'
          }}>
            <button 
              onClick={() => router.back()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                marginRight: '10px'
              }}
            >
              <i className="fas fa-arrow-left"></i> 戻る
            </button>
            <button 
              onClick={() => window.close()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              <i className="fas fa-times"></i> 閉じる
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id || typeof params.id !== 'string') {
    return {
      notFound: true,
    };
  }

  try {
    const recordId = params.id;
    
    // 全キャラクターデータを取得して、該当の記録セクションを検索
    const allCharacters = await getAllCharacterData();
    
    let foundRecord = null;
    let characterName = '';
    let sectionTitle = '';

    for (const character of allCharacters) {
      if (character.record_sections) {
        const recordSection = character.record_sections.find((section: any) => section.id === recordId);
        if (recordSection) {
          foundRecord = recordSection;
          characterName = character.character_name || 'キャラクター';
          sectionTitle = recordSection.section_title || '無題の記録';
          break;
        }
      }
    }

    if (!foundRecord) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        recordSection: foundRecord,
        characterName,
        sectionTitle,
      },
    };
  } catch (error) {
    console.error('getServerSideProps error:', error);
    return {
      notFound: true,
    };
  }
};