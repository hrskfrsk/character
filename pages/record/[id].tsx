import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getAllCharacterData } from '../../lib/firebase-admin';
import { linkifyText } from '../../lib/text-utils';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface RecordPageProps {
  recordSection: any;
  characterName: string;
  sectionTitle: string;
  characterId: string;
}

export default function RecordPage({ recordSection, characterName, sectionTitle, characterId }: RecordPageProps) {
  const router = useRouter();
  const [openFields, setOpenFields] = useState<{ [key: string]: boolean }>({});
  const [passwordInputs, setPasswordInputs] = useState<{ [key: string]: string }>({});
  const [passwordAuthenticated, setPasswordAuthenticated] = useState<{ [key: string]: boolean }>({});

  const toggleField = (fieldId: string) => {
    setOpenFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

  // パスワード認証
  const handlePasswordSubmit = (fieldId: string, field: any) => {
    const inputPassword = passwordInputs[fieldId] || '';
    if (inputPassword === field.password) {
      setPasswordAuthenticated(prev => ({ ...prev, [fieldId]: true }));
      setPasswordInputs(prev => ({ ...prev, [fieldId]: '' }));
    } else {
      alert('パスワードが正しくありません');
    }
  };

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

      <Header
        showBackButton={false}
        showCreateButton={false}
        showEditButton={true}
        editUrl={`/create?edit=${characterId}`}
      />

      <div>
        <div style={{
          maxWidth: '800px',
          margin: '3% auto 0',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px 30px 40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {/* ヘッダー */}
          <div style={{ marginBottom: '0', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
            <h1 style={{
              fontSize: '24px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <i className="fas fa-clipboard"></i>
              {sectionTitle}
            </h1>
            <p style={{
              color: '#666',
              fontSize: '14px',
              margin: 0
            }}>
              <a 
                href={`/character/${characterId}`}
                style={{ 
                  color: '#74cdc3',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#5fb5aa';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#74cdc3';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                <i className="fas fa-arrow-circle-left"></i>
                {characterName}のシートに戻る
              </a>
            </p>
          </div>

          {/* 記録内容 */}
          <div className="record-content">
            {recordSection.fields.map((field: any) => {
              // 開閉状態：open_by_defaultがtrueの場合は開いている、未定義/falseの場合は閉じている
              const defaultOpen = field.open_by_default === true;
              const isOpen = openFields[field.id] !== undefined ? openFields[field.id] : defaultOpen;

              // パスワード保護
              const isPasswordProtected = field.password_protected;
              const isAuthenticated = passwordAuthenticated[field.id] || false;
              const shouldShowContent = !isPasswordProtected || isAuthenticated;

              return (
                <div key={field.id} style={{ marginBottom: '0' }}>
                  {field.title && (
                    <h2
                      onClick={() => toggleField(field.id)}
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 'normal',
                        marginBottom: '0',
                        padding: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        userSelect: 'none',
                        borderBottom: 'dotted 1px #000',
                      }}
                    >
                      <i className={`fas ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ fontSize: '12px', marginRight: '8px' }}></i>
                      {isPasswordProtected && (
                        <i className="fas fa-lock" style={{
                          fontSize: '10px',
                          marginRight: '5px',
                          opacity: 0.7
                        }}></i>
                      )}
                      <span>{field.title}</span>
                    </h2>
                  )}
                  {isOpen && (
                    <div style={{
                      lineHeight: '1.8',
                      color: '#444',
                      fontSize: '0.9rem',
                      whiteSpace: 'pre-wrap',
                      padding: '10px 10px 30px',
                    }}>
                      {isPasswordProtected && !isAuthenticated ? (
                        <div style={{
                          textAlign: 'center',
                          padding: '20px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '4px',
                          border: '1px solid #e0e0e0'
                        }}>
                          <i className="fas fa-lock" style={{
                            fontSize: '24px',
                            color: '#ccc',
                            marginBottom: '10px',
                            display: 'block'
                          }}></i>
                          <p style={{
                            marginBottom: '15px',
                            color: '#666',
                            fontSize: '0.8rem'
                          }}>
                            この項目はパスワードで保護されています
                          </p>
                          <div style={{
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: '250px',
                            margin: '0 auto'
                          }}>
                            <input
                              type="password"
                              placeholder="パスワード"
                              value={passwordInputs[field.id] || ''}
                              onChange={(e) => setPasswordInputs(prev => ({ ...prev, [field.id]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handlePasswordSubmit(field.id, field);
                                }
                              }}
                              style={{
                                flex: 1,
                                padding: '6px 8px',
                                border: '1px solid #ddd',
                                borderRadius: '3px',
                                fontSize: '0.8rem'
                              }}
                            />
                            <button
                              onClick={() => handlePasswordSubmit(field.id, field)}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                              }}
                            >
                              解除
                            </button>
                          </div>
                        </div>
                      ) : (
                        linkifyText(field.content)
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <Footer />
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
    let characterId = '';

    for (const character of allCharacters) {
      if (character.record_sections) {
        const recordSection = character.record_sections.find((section: any) => section.id === recordId);
        if (recordSection) {
          foundRecord = recordSection;
          characterName = character.character_name || 'キャラクター';
          sectionTitle = recordSection.section_title || '無題の記録';
          characterId = character.id;
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
        characterId,
      },
    };
  } catch (error) {
    console.error('getServerSideProps error:', error);
    return {
      notFound: true,
    };
  }
};