import { chatWithAI, generateContent } from './ollama';

// System prompt for the kitchen design assistant
const KITCHEN_ASSISTANT_PROMPT = `You are an expert luxury kitchen design consultant with 20+ years of experience. You specialize in:
- Modern and classic kitchen designs
- Space optimization and ergonomics
- Material selection (countertops, cabinets, flooring)
- Color schemes and lighting design
- Appliance recommendations
- Budget planning
- Kitchen trends and innovations

Provide helpful, professional advice while being friendly and approachable. Always consider the user's specific needs, space constraints, and budget.`;

export interface KitchenDesignQuery {
  userMessage: string;
  context?: {
    budget?: string;
    space?: string;
    style?: string;
    preferences?: string[];
  };
}

export async function getKitchenDesignAdvice(query: KitchenDesignQuery) {
  const contextInfo = query.context ? `
Context:
- Budget: ${query.context.budget || 'Not specified'}
- Space: ${query.context.space || 'Not specified'}
- Style: ${query.context.style || 'Not specified'}
- Preferences: ${query.context.preferences?.join(', ') || 'Not specified'}
` : '';

  const messages = [
    {
      role: 'system',
      content: KITCHEN_ASSISTANT_PROMPT
    },
    {
      role: 'user',
      content: `${query.userMessage}${contextInfo}`
    }
  ];

  return await chatWithAI(messages);
}

// Generate kitchen design ideas based on parameters
export async function generateKitchenIdeas(params: {
  style: string;
  size: string;
  budget: string;
  features?: string[];
}) {
  const prompt = `Generate 3 unique kitchen design ideas for:
- Style: ${params.style}
- Size: ${params.size}
- Budget: ${params.budget}
${params.features ? `- Must-have features: ${params.features.join(', ')}` : ''}

For each idea provide:
1. Design concept name
2. Key design elements
3. Recommended materials
4. Color scheme
5. Special features
6. Estimated cost breakdown`;

  return await generateContent(prompt);
}

// Analyze a kitchen space and provide recommendations
export async function analyzeKitchenSpace(description: string) {
  const prompt = `As a kitchen design expert, analyze this kitchen space and provide recommendations:

${description}

Please provide:
1. Space optimization suggestions
2. Potential layout improvements
3. Storage solutions
4. Lighting recommendations
5. Material upgrade suggestions
6. Estimated renovation timeline
7. Budget-friendly alternatives`;

  return await generateContent(prompt);
}

// Generate kitchen trend report
export async function generateTrendReport() {
  const currentYear = new Date().getFullYear();
  const prompt = `Generate a comprehensive luxury kitchen design trends report for ${currentYear}. Include:
1. Top 5 design trends
2. Popular color schemes
3. Innovative materials and finishes
4. Smart kitchen technology
5. Sustainability features
6. What's going out of style
7. Investment-worthy upgrades`;

  return await generateContent(prompt);
}

// Material recommendation engine
export async function recommendMaterials(requirements: {
  surface: 'countertop' | 'backsplash' | 'flooring' | 'cabinet';
  budget: 'economy' | 'mid-range' | 'luxury';
  style: string;
  durability: 'low' | 'medium' | 'high';
}) {
  const prompt = `Recommend the best ${requirements.surface} materials for:
- Budget level: ${requirements.budget}
- Design style: ${requirements.style}
- Durability needs: ${requirements.durability}

For each recommendation provide:
1. Material name and type
2. Pros and cons
3. Price range
4. Maintenance requirements
5. Longevity expectations
6. Style compatibility
7. Installation considerations`;

  return await generateContent(prompt);
}

// Kitchen layout optimizer
export async function optimizeKitchenLayout(dimensions: {
  length: number;
  width: number;
  height: number;
  windows: number;
  doors: number;
  requirements: string[];
}) {
  const prompt = `Design an optimal kitchen layout for:
- Dimensions: ${dimensions.length}ft x ${dimensions.width}ft x ${dimensions.height}ft height
- Windows: ${dimensions.windows}
- Doors: ${dimensions.doors}
- Requirements: ${dimensions.requirements.join(', ')}

Provide:
1. Recommended layout type (L-shape, U-shape, galley, island, etc.)
2. Work triangle optimization
3. Cabinet and appliance placement
4. Island/peninsula recommendations
5. Storage maximization tips
6. Traffic flow considerations
7. Lighting placement suggestions`;

  return await generateContent(prompt);
}