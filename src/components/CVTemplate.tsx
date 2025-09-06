import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Mail, MapPin, Globe, Calendar, Building, GraduationCap, Code, ExternalLink, Linkedin } from "lucide-react";
import type { CVData } from "./types";
import { defaultCVData } from "./types";

export function CVTemplate({ data = defaultCVData }: { data?: CVData }) {
  return (
    <div 
      className="max-w-4xl mx-auto p-6 bg-white print:p-4 print:max-w-none print:mx-0 cv-template pdf-export"
      style={{
        width: '100%',
        minWidth: '794px', // Minimum A4-like width for consistency
        margin: '0 auto',
        backgroundColor: '#ffffff',
        color: '#252525'
      }}
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl mb-2">{data.name}</h1>
        <p className="text-muted-foreground text-lg">{data.title}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 cv-main-layout">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6 cv-left-column">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.contact.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{data.contact.email}</span>
                </div>
              )}
              {data.contact.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{data.contact.location}</span>
                </div>
              )}
              {data.contact.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span>{data.contact.website}</span>
                </div>
              )}
              {data.contact.linkedin && (
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                  <span>{data.contact.linkedin}</span>
                </div>
              )}
              {data.contact.upwork && (
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.245c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3.002-2.439-5.451-5.439-5.451z"/>
                  </svg>
                  <span>{data.contact.upwork}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Technical Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.skills.technical.filter(category => category.isVisible !== false).map((category) => (
                <div key={`skill-category-${category.id}`}>
                  <h4 className="text-sm font-medium mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <Badge key={`skill-${category.id}-${index}-${skill.replace(/\s+/g, '-').toLowerCase()}`} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.languages.map((language, index) => (
                <div key={`lang-${index}-${language.name.replace(/\s+/g, '-').toLowerCase()}`} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{language.name}</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {language.level}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6 cv-right-column">
          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm leading-relaxed whitespace-pre-line">{data.summary}</div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.experience.filter(exp => exp.isVisible !== false).map((exp, visibleIndex, visibleArray) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      {exp.companyLink ? (
                        <h3 className="font-medium flex items-center gap-1">
                          <a 
                            href={exp.companyLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {exp.company}
                          </a>
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </h3>
                      ) : (
                        <h3 className="font-medium">{exp.company}</h3>
                      )}
                      <p className="text-sm text-muted-foreground">{exp.title}</p>
                      {exp.category && (
                        <p className="text-xs text-muted-foreground">{exp.category}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-3 whitespace-pre-line">{exp.description}</p>
                  {exp.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {exp.techStack.map((tech, techIndex) => (
                        <Badge key={`tech-${exp.id}-${techIndex}-${tech.replace(/\s+/g, '-').toLowerCase()}`} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={`achievement-${exp.id}-${achIndex}-${achievement.slice(0, 10).replace(/\s+/g, '-').toLowerCase()}`} className="text-sm text-muted-foreground">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {visibleIndex < visibleArray.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={`edu-${index}-${edu.institution.replace(/\s+/g, '-').toLowerCase()}-${edu.year}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{edu.year}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
}