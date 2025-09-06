import { useState, useRef, useEffect } from "react";
import { CVTemplate } from "./CVTemplate";
import { PDFExport } from "./PDFExport";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Plus, X, Eye, Edit, GripVertical, ArrowUp, ArrowDown, EyeOff, Save, BookOpen, TestTube } from "lucide-react";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import type { CVData, ContactInfo, Experience, Education, TechnicalSkillCategory, CVTemplate } from "./types";
import { mockCVData } from "./types";
import { toast } from "sonner@2.0.3";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface DraggableExperienceItemProps {
  experience: Experience;
  index: number;
  moveExperience: (dragIndex: number, hoverIndex: number) => void;
  updateExperience: (index: number, field: keyof Experience, value: string | string[] | boolean) => void;
  removeExperience: (index: number) => void;
  toggleExperienceVisibility: (index: number) => void;
}

interface DraggableSkillCategoryProps {
  category: TechnicalSkillCategory;
  categoryIndex: number;
  moveSkillCategory: (dragIndex: number, hoverIndex: number) => void;
  updateSkillCategory: (categoryId: string, field: keyof TechnicalSkillCategory, value: any) => void;
  removeSkillCategory: (categoryId: string) => void;
  addSkillToCategory: (categoryId: string, skill: string) => void;
  removeSkillFromCategory: (categoryId: string, skillIndex: number) => void;
  moveSkillWithinCategory: (categoryId: string, fromIndex: number, toIndex: number) => void;
  toggleSkillCategoryVisibility: (categoryId: string) => void;
}

const DraggableExperienceItem = ({ 
  experience, 
  index, 
  moveExperience, 
  updateExperience, 
  removeExperience,
  toggleExperienceVisibility
}: DraggableExperienceItemProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "experience",
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const [, drop] = useDrop({
    accept: "experience",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveExperience(draggedItem.index, index);
        draggedItem.index = index;
      }
    }
  });

  const addAchievement = () => {
    const newAchievements = [...(experience.achievements || []), ""];
    updateExperience(index, "achievements", newAchievements);
  };

  const updateAchievement = (achievementIndex: number, value: string) => {
    const newAchievements = [...(experience.achievements || [])];
    newAchievements[achievementIndex] = value;
    updateExperience(index, "achievements", newAchievements);
  };

  const removeAchievement = (achievementIndex: number) => {
    const newAchievements = (experience.achievements || []).filter((_, i) => i !== achievementIndex);
    updateExperience(index, "achievements", newAchievements);
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-4 border rounded-lg space-y-4 cursor-move ${isDragging ? 'opacity-50' : ''} ${experience.isVisible === false ? 'opacity-60 bg-muted/30' : ''}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-medium">Experience #{index + 1}</h3>
          {experience.isVisible === false && <EyeOff className="w-4 h-4 text-muted-foreground" />}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleExperienceVisibility(index)}
            title={experience.isVisible === false ? "Show in CV" : "Hide from CV"}
          >
            {experience.isVisible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeExperience(index)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Job Title</Label>
          <Input
            value={experience.title}
            onChange={(e) => updateExperience(index, "title", e.target.value)}
            placeholder="Senior Developer"
          />
        </div>
        <div>
          <Label>Company</Label>
          <Input
            value={experience.company}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
            placeholder="TechCorp Inc."
          />
        </div>
        <div>
          <Label>Company Link (Optional)</Label>
          <Input
            value={experience.companyLink || ""}
            onChange={(e) => updateExperience(index, "companyLink", e.target.value)}
            placeholder="https://company.com"
          />
        </div>
        <div>
          <Label>Period</Label>
          <Input
            value={experience.period}
            onChange={(e) => updateExperience(index, "period", e.target.value)}
            placeholder="2022 - Present"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select value={experience.category || ""} onValueChange={(value) => updateExperience(index, "category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Job Description</Label>
        <Textarea
          value={experience.description}
          onChange={(e) => updateExperience(index, "description", e.target.value)}
          placeholder="Describe your role and achievements..."
          rows={4}
        />
      </div>
      <div>
        <Label>Technical Stack (comma-separated)</Label>
        <Input
          value={experience.techStack.join(", ")}
          onChange={(e) => updateExperience(index, "techStack", e.target.value.split(", ").filter(t => t.trim()))}
          placeholder="React, Node.js, PostgreSQL"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Key Achievements</Label>
          <Button onClick={addAchievement} size="sm" variant="outline">
            <Plus className="w-4 h-4" />
            Add Achievement
          </Button>
        </div>
        <div className="space-y-2">
          {(experience.achievements || []).map((achievement, achIndex) => (
            <div key={`${experience.id}-ach-input-${achIndex}`} className="flex gap-2">
              <Input
                value={achievement}
                onChange={(e) => updateAchievement(achIndex, e.target.value)}
                placeholder="Describe a key achievement..."
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeAchievement(achIndex)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DraggableSkillCategory = ({
  category,
  categoryIndex,
  moveSkillCategory,
  updateSkillCategory,
  removeSkillCategory,
  addSkillToCategory,
  removeSkillFromCategory,
  moveSkillWithinCategory,
  toggleSkillCategoryVisibility
}: DraggableSkillCategoryProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "skillCategory",
    item: { index: categoryIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const [, drop] = useDrop({
    accept: "skillCategory",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== categoryIndex) {
        moveSkillCategory(draggedItem.index, categoryIndex);
        draggedItem.index = categoryIndex;
      }
    }
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-4 border rounded-lg space-y-4 cursor-move ${isDragging ? 'opacity-50' : ''} ${category.isVisible === false ? 'opacity-60 bg-muted/30' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
          <h4 className="font-medium">{category.name}</h4>
          {category.isVisible === false && <EyeOff className="w-4 h-4 text-muted-foreground" />}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSkillCategoryVisibility(category.id)}
            title={category.isVisible === false ? "Show in CV" : "Hide from CV"}
          >
            {category.isVisible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeSkillCategory(category.id)}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Add a skill..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const target = e.target as HTMLInputElement;
              addSkillToCategory(category.id, target.value);
              target.value = "";
            }
          }}
        />
        <Button
          onClick={(e) => {
            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
            if (input && input.value) {
              addSkillToCategory(category.id, input.value);
              input.value = "";
            }
          }}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <div key={`${category.id}-skill-item-${skillIndex}-${skill}`} className="flex items-center gap-1">
            <Badge variant="secondary" className="flex items-center gap-1">
              {skill}
              <button
                onClick={() => removeSkillFromCategory(category.id, skillIndex)}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveSkillWithinCategory(category.id, skillIndex, Math.max(0, skillIndex - 1))}
                disabled={skillIndex === 0}
                className="h-6 w-6 p-0"
              >
                <ArrowUp className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => moveSkillWithinCategory(category.id, skillIndex, Math.min(category.skills.length - 1, skillIndex + 1))}
                disabled={skillIndex === category.skills.length - 1}
                className="h-6 w-6 p-0"
              >
                <ArrowDown className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const initialData: CVData = {
  name: "",
  title: "",
  summary: "",
  contact: {
    email: "",
    location: "",
    website: "",
    linkedin: "",
    upwork: ""
  },
  skills: {
    technical: []
  },
  languages: [],
  experience: [],
  education: []
};

export function CVGenerator() {
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [newSkill, setNewSkill] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [savedTemplates, setSavedTemplates] = useState<CVTemplate[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showLoadTemplateDialog, setShowLoadTemplateDialog] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  // Load saved templates on component mount
  useEffect(() => {
    const saved = localStorage.getItem('cvTemplates');
    if (saved) {
      try {
        const templates = JSON.parse(saved);
        setSavedTemplates(templates);
      } catch (error) {
        console.error('Error loading templates:', error);
      }
    }
  }, []);

  const updateContact = (field: keyof ContactInfo, value: string) => {
    setCvData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const addExperience = () => {
    const newId = `exp${Date.now()}`;
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: newId,
        title: "",
        company: "",
        companyLink: "",
        period: "",
        description: "",
        techStack: [],
        achievements: [],
        category: "",
        isVisible: true
      }]
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[] | boolean) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const toggleExperienceVisibility = (index: number) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, isVisible: exp.isVisible === false ? true : false } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const moveExperience = (dragIndex: number, hoverIndex: number) => {
    setCvData(prev => {
      const draggedExperience = prev.experience[dragIndex];
      const newExperience = [...prev.experience];
      newExperience.splice(dragIndex, 1);
      newExperience.splice(hoverIndex, 0, draggedExperience);
      return { ...prev, experience: newExperience };
    });
  };

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: "",
        institution: "",
        year: "",
        gpa: ""
      }]
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index: number) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, { name: "", level: "" }]
    }));
  };

  const updateLanguage = (index: number, field: "name" | "level", value: string) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => 
        i === index ? { ...lang, [field]: value } : lang
      )
    }));
  };

  const removeLanguage = (index: number) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const addSkillCategory = () => {
    const categoryName = newSkillCategory.trim();
    if (categoryName) {
      const newId = `cat${Date.now()}`;
      setCvData(prev => ({
        ...prev,
        skills: {
          technical: [...prev.skills.technical, {
            id: newId,
            name: categoryName,
            skills: [],
            isVisible: true
          }]
        }
      }));
      setNewSkillCategory("");
    }
  };

  const removeSkillCategory = (categoryId: string) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        technical: prev.skills.technical.filter(cat => cat.id !== categoryId)
      }
    }));
  };

  const addSkillToCategory = (categoryId: string, skill: string) => {
    const trimmedSkill = skill?.trim();
    if (trimmedSkill && trimmedSkill.length > 0) {
      setCvData(prev => ({
        ...prev,
        skills: {
          technical: prev.skills.technical.map(cat => 
            cat.id === categoryId 
              ? { ...cat, skills: [...(cat.skills || []), trimmedSkill] }
              : cat
          )
        }
      }));
    }
  };

  const removeSkillFromCategory = (categoryId: string, skillIndex: number) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        technical: prev.skills.technical.map(cat => 
          cat.id === categoryId 
            ? { ...cat, skills: cat.skills.filter((_, i) => i !== skillIndex) }
            : cat
        )
      }
    }));
  };

  const moveSkillCategory = (fromIndex: number, toIndex: number) => {
    setCvData(prev => {
      const newCategories = [...prev.skills.technical];
      const [movedCategory] = newCategories.splice(fromIndex, 1);
      newCategories.splice(toIndex, 0, movedCategory);
      return {
        ...prev,
        skills: { technical: newCategories }
      };
    });
  };

  const moveSkillWithinCategory = (categoryId: string, fromIndex: number, toIndex: number) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        technical: prev.skills.technical.map(cat => {
          if (cat.id === categoryId) {
            const newSkills = [...cat.skills];
            const [movedSkill] = newSkills.splice(fromIndex, 1);
            newSkills.splice(toIndex, 0, movedSkill);
            return { ...cat, skills: newSkills };
          }
          return cat;
        })
      }
    }));
  };

  const updateSkillCategory = (categoryId: string, field: keyof TechnicalSkillCategory, value: any) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        technical: prev.skills.technical.map(cat => 
          cat.id === categoryId ? { ...cat, [field]: value } : cat
        )
      }
    }));
  };

  const toggleSkillCategoryVisibility = (categoryId: string) => {
    setCvData(prev => ({
      ...prev,
      skills: {
        technical: prev.skills.technical.map(cat => 
          cat.id === categoryId ? { ...cat, isVisible: cat.isVisible === false ? true : false } : cat
        )
      }
    }));
  };

  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    const newTemplate: CVTemplate = {
      id: `template${Date.now()}`,
      name: templateName.trim(),
      data: { ...cvData },
      createdAt: new Date()
    };

    setSavedTemplates(prev => [...prev, newTemplate]);
    localStorage.setItem('cvTemplates', JSON.stringify([...savedTemplates, newTemplate]));
    setTemplateName("");
    setShowTemplateDialog(false);
    toast.success("Template saved successfully!");
  };

  const loadTemplate = (template: CVTemplate) => {
    setCvData(template.data);
    setShowLoadTemplateDialog(false);
    toast.success(`Template "${template.name}" loaded successfully!`);
  };

  const deleteTemplate = (templateId: string) => {
    const updatedTemplates = savedTemplates.filter(t => t.id !== templateId);
    setSavedTemplates(updatedTemplates);
    localStorage.setItem('cvTemplates', JSON.stringify(updatedTemplates));
    toast.success("Template deleted successfully!");
  };

  const loadMockData = () => {
    setCvData(mockCVData);
    toast.success("Mock data loaded successfully! Perfect for testing all features.");
  };

  if (viewMode === "preview") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl">CV Preview</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setViewMode("edit")}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <PDFExport 
                elementRef={cvRef}
                filename={cvData.name || "CV"}
                cvData={cvData}
              />
            </div>
          </div>
        </div>
        <div className="py-8">
          <div ref={cvRef}>
            <CVTemplate data={cvData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl">CV Generator</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={loadMockData}
              className="flex items-center gap-2"
            >
              <TestTube className="w-4 h-4" />
              Load Mock Data
            </Button>
            <Dialog open={showLoadTemplateDialog} onOpenChange={setShowLoadTemplateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Load Template
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby="load-template-description">
                <DialogHeader>
                  <DialogTitle>Load Template</DialogTitle>
                  <DialogDescription id="load-template-description">
                    Choose a previously saved template to load into the CV generator.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {savedTemplates.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No saved templates found.</p>
                  ) : (
                    savedTemplates.map((template) => (
                      <div key={template.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Created: {new Date(template.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => loadTemplate(template)} size="sm">
                            Load
                          </Button>
                          <Button
                            onClick={() => deleteTemplate(template.id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Template
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby="save-template-description">
                <DialogHeader>
                  <DialogTitle>Save as Template</DialogTitle>
                  <DialogDescription id="save-template-description">
                    Save your current CV data as a template for future use.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input
                      id="templateName"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="My CV Template"
                    />
                  </div>
                  <Button onClick={saveTemplate} className="w-full">
                    Save Template
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => setViewMode("preview")}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview CV
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Quick Actions Section */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-medium">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">
                  Test the CV generator or export your CV as a PDF document
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={loadMockData}
                  className="flex items-center gap-2"
                >
                  <TestTube className="w-4 h-4" />
                  Load Test Data
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setViewMode("preview")}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <PDFExport 
                  elementRef={cvRef}
                  filename={cvData.name || "CV"}
                  cvData={cvData}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hidden CV element for PDF export */}
        <div 
          className="fixed bg-white"
          style={{
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            width: 'auto',
            height: 'auto',
            minWidth: '794px', // Minimum A4-like width
            overflow: 'visible',
            zIndex: -1,
            visibility: 'hidden'
          }}
          aria-hidden="true"
        >
          <div ref={cvRef}>
            <CVTemplate data={cvData} />
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={cvData.name}
                    onChange={(e) => setCvData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={cvData.title}
                    onChange={(e) => setCvData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Senior Software Developer"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={cvData.summary}
                    onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Brief description of your professional background and key achievements..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={cvData.contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={cvData.contact.location}
                    onChange={(e) => updateContact("location", e.target.value)}
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    value={cvData.contact.website || ""}
                    onChange={(e) => updateContact("website", e.target.value)}
                    placeholder="johndoe.dev"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                  <Input
                    id="linkedin"
                    value={cvData.contact.linkedin || ""}
                    onChange={(e) => updateContact("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="upwork">Upwork (Optional)</Label>
                  <Input
                    id="upwork"
                    value={cvData.contact.upwork || ""}
                    onChange={(e) => updateContact("upwork", e.target.value)}
                    placeholder="upwork.com/freelancers/johndoe"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Work Experience</CardTitle>
                <Button onClick={addExperience} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {cvData.experience.map((exp, index) => (
                  <DraggableExperienceItem
                    key={exp.id}
                    experience={exp}
                    index={index}
                    moveExperience={moveExperience}
                    updateExperience={updateExperience}
                    removeExperience={removeExperience}
                    toggleExperienceVisibility={toggleExperienceVisibility}
                  />
                ))}
                {cvData.experience.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No work experience added yet. Click "Add Experience" to get started.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button onClick={addEducation} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {cvData.education.map((edu, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">Education #{index + 1}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeEducation(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, "degree", e.target.value)}
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div>
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, "institution", e.target.value)}
                          placeholder="University of California, Berkeley"
                        />
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) => updateEducation(index, "year", e.target.value)}
                          placeholder="2019"
                        />
                      </div>
                      <div>
                        <Label>GPA (Optional)</Label>
                        <Input
                          value={edu.gpa || ""}
                          onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                          placeholder="3.8/4.0"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {cvData.education.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No education added yet. Click "Add Education" to get started.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Technical Skills</CardTitle>
                <div className="flex gap-2">
                  <Input
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    placeholder="Category name..."
                    onKeyDown={(e) => e.key === "Enter" && addSkillCategory()}
                    className="w-40"
                  />
                  <Button onClick={addSkillCategory} size="sm">
                    <Plus className="w-4 h-4" />
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {cvData.skills.technical.map((category, categoryIndex) => (
                  <DraggableSkillCategory
                    key={category.id}
                    category={category}
                    categoryIndex={categoryIndex}
                    moveSkillCategory={moveSkillCategory}
                    updateSkillCategory={updateSkillCategory}
                    removeSkillCategory={removeSkillCategory}
                    addSkillToCategory={addSkillToCategory}
                    removeSkillFromCategory={removeSkillFromCategory}
                    moveSkillWithinCategory={moveSkillWithinCategory}
                    toggleSkillCategoryVisibility={toggleSkillCategoryVisibility}
                  />
                ))}
                {cvData.skills.technical.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No skill categories added yet. Click "Add Category" to get started.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Languages</CardTitle>
                <Button onClick={addLanguage} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Language
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {cvData.languages.map((lang, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label>Language</Label>
                      <Input
                        value={lang.name}
                        onChange={(e) => updateLanguage(index, "name", e.target.value)}
                        placeholder="English"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Level</Label>
                      <Input
                        value={lang.level}
                        onChange={(e) => updateLanguage(index, "level", e.target.value)}
                        placeholder="Native"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeLanguage(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </DndProvider>
  );
}