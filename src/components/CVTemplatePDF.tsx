import type { CVData } from "./types";
import { defaultCVData } from "./types";
import { Mail, MapPin, Globe, Calendar, Building, GraduationCap, Code, ExternalLink, Linkedin } from "lucide-react";

// PDF-safe styling using only RGB colors and inline styles where needed
const pdfStyles = {
  container: {
    backgroundColor: '#ffffff',
    color: '#252525',
    padding: '24px',
    width: '100%',
    maxWidth: 'none',
    margin: '0 auto',
    boxSizing: 'border-box'
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  cardHeader: {
    padding: '16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  cardContent: {
    padding: '16px'
  },
  badge: {
    backgroundColor: '#f1f2f4',
    color: '#030213',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  badgeOutline: {
    backgroundColor: 'transparent',
    color: '#030213',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  mutedText: {
    color: '#717182'
  },
  separator: {
    height: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    margin: '16px 0'
  },
  icon: {
    width: '16px',
    height: '16px',
    color: '#252525',
    fill: 'currentColor'
  },
  iconMuted: {
    width: '16px',
    height: '16px',
    color: '#717182',
    fill: 'currentColor'
  },
  iconSmall: {
    width: '12px',
    height: '12px',
    color: '#717182',
    fill: 'currentColor'
  }
};

export function CVTemplatePDF({ data = defaultCVData }: { data?: CVData }) {
  return (
    <div 
      className="pdf-cv-container"
      style={{
        ...pdfStyles.container,
        width: '100%',
        minWidth: '850px', // Ensure adequate width
        maxWidth: '100%',
        height: 'auto',
        margin: '0 auto',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        position: 'relative'
      }}
    >
      {/* Header */}
      <div 
        className="pdf-header"
        style={{ 
          marginBottom: '24px', 
          textAlign: 'center',
          paddingBottom: '16px',
          borderBottom: '2px solid rgba(0, 0, 0, 0.1)'
        }}
      >
        <h1 style={{ 
          fontSize: '28px', 
          marginBottom: '8px', 
          fontWeight: '600',
          color: '#030213',
          margin: '0 0 8px 0'
        }}>
          {data.name}
        </h1>
        <p style={{ 
          ...pdfStyles.mutedText, 
          fontSize: '16px',
          margin: '0'
        }}>
          {data.title}
        </p>
      </div>

      {/* Two-column layout using table for maximum PDF compatibility */}
      <table 
        className="pdf-layout-table"
        style={{ 
          width: '100%',
          maxWidth: '100%',
          tableLayout: 'fixed',
          borderCollapse: 'separate',
          borderSpacing: '24px 0',
          margin: '0 auto',
          padding: '0'
        }}
      >
        <colgroup>
          <col style={{ width: '300px' }} />
          <col style={{ width: 'calc(100% - 324px)' }} />
        </colgroup>
        <tbody>
          <tr>
            <td 
              className="pdf-left-column"
              style={{ 
                verticalAlign: 'top',
                padding: '0',
                margin: '0',
                width: '300px',
                maxWidth: '300px'
              }}
            >
              {/* Left Column Content */}
              <div className="pdf-left-content" style={{ display: 'block' }}>
                
                {/* Contact Information */}
                <div style={{ ...pdfStyles.card, marginBottom: '20px' }}>
                  <div style={pdfStyles.cardHeader}>
                    <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail style={{ width: '16px', height: '16px', color: '#252525' }} />
                      Contact
                    </h3>
                  </div>
                  <div style={{ ...pdfStyles.cardContent }}>
                    {data.contact.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px' }}>
                        <Mail style={{ width: '14px', height: '14px', color: '#717182', flexShrink: '0' }} />
                        <span>{data.contact.email}</span>
                      </div>
                    )}
                    {data.contact.location && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px' }}>
                        <MapPin style={{ width: '14px', height: '14px', color: '#717182', flexShrink: '0' }} />
                        <span>{data.contact.location}</span>
                      </div>
                    )}
                    {data.contact.website && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px' }}>
                        <Globe style={{ width: '14px', height: '14px', color: '#717182', flexShrink: '0' }} />
                        <span>{data.contact.website}</span>
                      </div>
                    )}
                    {data.contact.linkedin && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px' }}>
                        <Linkedin style={{ width: '14px', height: '14px', color: '#717182', flexShrink: '0' }} />
                        <span>{data.contact.linkedin}</span>
                      </div>
                    )}
                    {data.contact.upwork && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px' }}>
                        <svg style={{ width: '14px', height: '14px', color: '#717182', flexShrink: '0' }} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.245c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.002-2.439-5.451-5.439-5.451z"/>
                        </svg>
                        <span>{data.contact.upwork}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Technical Skills */}
                <div style={{ ...pdfStyles.card, marginBottom: '20px' }}>
                  <div style={pdfStyles.cardHeader}>
                    <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Code style={{ width: '16px', height: '16px', color: '#252525' }} />
                      Technical Skills
                    </h3>
                  </div>
                  <div style={pdfStyles.cardContent}>
                    {data.skills.technical.filter(cat => cat.isVisible !== false).map((category, catIndex) => (
                      <div key={category.id} style={{ marginBottom: catIndex < data.skills.technical.filter(cat => cat.isVisible !== false).length - 1 ? '16px' : '0' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', margin: '0 0 8px 0' }}>{category.name}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {category.skills.map((skill, index) => (
                            <span key={`${category.id}-skill-${index}-${skill}`} style={pdfStyles.badge}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                {data.languages.length > 0 && (
                  <div style={pdfStyles.card}>
                    <div style={pdfStyles.cardHeader}>
                      <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0' }}>Languages</h3>
                    </div>
                    <div style={pdfStyles.cardContent}>
                      {data.languages.map((language, index) => (
                        <div key={`lang-${index}-${language.name}`} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: index < data.languages.length - 1 ? '8px' : '0'
                        }}>
                          <span style={{ fontSize: '14px', fontWeight: '500' }}>{language.name}</span>
                          <span style={{ fontSize: '12px', ...pdfStyles.mutedText, backgroundColor: '#ececf0', padding: '4px 8px', borderRadius: '6px' }}>
                            {language.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </td>
            <td 
              className="pdf-right-column"
              style={{ 
                verticalAlign: 'top',
                padding: '0',
                margin: '0'
              }}
            >

              {/* Right Column Content */}
              <div className="pdf-right-content" style={{ display: 'block' }}>
                
                {/* Professional Summary */}
                <div style={{ ...pdfStyles.card, marginBottom: '20px' }}>
                  <div style={pdfStyles.cardHeader}>
                    <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0' }}>Professional Summary</h3>
                  </div>
                  <div style={pdfStyles.cardContent}>
                    <div style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{data.summary}</div>
                  </div>
                </div>

                {/* Experience */}
                {data.experience.filter(exp => exp.isVisible !== false).length > 0 && (
                  <div style={{ ...pdfStyles.card, marginBottom: '20px' }}>
                    <div style={pdfStyles.cardHeader}>
                      <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Building style={{ width: '16px', height: '16px', color: '#252525' }} />
                        Experience
                      </h3>
                    </div>
                    <div style={pdfStyles.cardContent}>
                      {data.experience.filter(exp => exp.isVisible !== false).map((exp, visibleIndex, visibleArray) => (
                        <div key={exp.id} style={{ marginBottom: visibleIndex < visibleArray.length - 1 ? '24px' : '0' }}>
                          <div style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                              <div style={{ flex: '1' }}>
                                {exp.companyLink ? (
                                  <h4 style={{ fontSize: '14px', fontWeight: '500', margin: '0', marginBottom: '2px' }}>
                                    <a 
                                      href={exp.companyLink} 
                                      style={{ color: '#030213', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '4px' }}
                                    >
                                      {exp.company}
                                      <ExternalLink style={{ width: '12px', height: '12px', color: '#717182' }} />
                                    </a>
                                  </h4>
                                ) : (
                                  <h4 style={{ fontSize: '14px', fontWeight: '500', margin: '0', marginBottom: '2px' }}>{exp.company}</h4>
                                )}
                                <p style={{ fontSize: '14px', ...pdfStyles.mutedText, margin: '0', marginBottom: '2px' }}>{exp.title}</p>
                                {exp.category && (
                                  <p style={{ fontSize: '12px', ...pdfStyles.mutedText, margin: '0' }}>{exp.category}</p>
                                )}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', ...pdfStyles.mutedText, flexShrink: '0', marginLeft: '16px' }}>
                                <Calendar style={{ width: '12px', height: '12px', color: '#717182', flexShrink: '0' }} />
                                {exp.period}
                              </div>
                            </div>
                          </div>
                          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '12px', whiteSpace: 'pre-line', margin: '0 0 12px 0' }}>{exp.description}</p>
                          {exp.techStack.length > 0 && (
                            <div style={{ marginBottom: '12px' }}>
                              {exp.techStack.map((tech, techIndex) => (
                                <span key={`${exp.id}-tech-${techIndex}-${tech}`} style={{ 
                                  ...pdfStyles.badgeOutline, 
                                  fontSize: '12px',
                                  marginRight: '6px',
                                  marginBottom: '4px',
                                  display: 'inline-block'
                                }}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div style={{ marginBottom: '12px' }}>
                              <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', margin: '0 0 8px 0' }}>Key Achievements:</h4>
                              <ul style={{ marginLeft: '16px', paddingLeft: '0', margin: '0' }}>
                                {exp.achievements.map((achievement, achIndex) => (
                                  <li key={`${exp.id}-ach-${achIndex}`} style={{ fontSize: '14px', ...pdfStyles.mutedText, marginBottom: '4px' }}>
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {visibleIndex < visibleArray.length - 1 && <div style={{ ...pdfStyles.separator, margin: '16px 0' }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                  <div style={pdfStyles.card}>
                    <div style={pdfStyles.cardHeader}>
                      <h3 style={{ fontSize: '16px', fontWeight: '500', margin: '0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <GraduationCap style={{ width: '16px', height: '16px', color: '#252525' }} />
                        Education
                      </h3>
                    </div>
                    <div style={pdfStyles.cardContent}>
                      {data.education.map((edu, index) => (
                        <div key={`edu-${index}-${edu.institution}-${edu.year}`} style={{ marginBottom: index < data.education.length - 1 ? '16px' : '0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: '1' }}>
                              <h4 style={{ fontSize: '14px', fontWeight: '500', margin: '0', marginBottom: '2px' }}>{edu.degree}</h4>
                              <p style={{ fontSize: '14px', ...pdfStyles.mutedText, margin: '0', marginBottom: '2px' }}>{edu.institution}</p>
                              {edu.gpa && (
                                <p style={{ fontSize: '14px', ...pdfStyles.mutedText, margin: '0' }}>GPA: {edu.gpa}</p>
                              )}
                            </div>
                            <div style={{ fontSize: '14px', ...pdfStyles.mutedText, flexShrink: '0', marginLeft: '16px' }}>{edu.year}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}