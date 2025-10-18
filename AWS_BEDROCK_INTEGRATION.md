# AWS Bedrock Integration Guide for Populus.ai

## Overview
This guide will help you integrate your AWS Bedrock AI agent with the Populus.ai frontend. The frontend is already set up and ready to connect to your backend APIs.

## Architecture

```
Frontend (React/TypeScript) → API Gateway → Lambda Functions → AWS Bedrock Agent
```

## Prerequisites

1. AWS Account with Bedrock access
2. AWS Bedrock Agent configured with:
   - LLM model (e.g., Claude, Llama)
   - AgentCore primitives
   - Required tools and integrations

## Backend Setup

### 1. Create Lambda Functions

Create three Lambda functions for each feature:

#### A. Search Papers Function
```python
import boto3
import json

bedrock_agent = boto3.client('bedrock-agent-runtime')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    query = body.get('query', '')
    
    response = bedrock_agent.invoke_agent(
        agentId='YOUR_AGENT_ID',
        agentAliasId='YOUR_ALIAS_ID',
        sessionId=body.get('sessionId', 'default'),
        inputText=f"Search for academic papers about: {query}"
    )
    
    # Process response
    results = process_search_results(response)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'results': results,
            'sessionId': response.get('sessionId')
        })
    }
```

#### B. Summarize Papers Function
```python
import boto3
import json

bedrock_agent = boto3.client('bedrock-agent-runtime')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    paper_content = body.get('content', '')
    
    response = bedrock_agent.invoke_agent(
        agentId='YOUR_AGENT_ID',
        agentAliasId='YOUR_ALIAS_ID',
        sessionId=body.get('sessionId', 'default'),
        inputText=f"Summarize this research paper: {paper_content}"
    )
    
    # Process response
    summary = extract_summary(response)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'summary': summary,
            'sessionId': response.get('sessionId')
        })
    }
```

#### C. Write Papers Function
```python
import boto3
import json

bedrock_agent = boto3.client('bedrock-agent-runtime')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    topic = body.get('topic', '')
    outline = body.get('outline', '')
    
    prompt = f"Write a research paper on: {topic}"
    if outline:
        prompt += f"\n\nFollow this outline: {outline}"
    
    response = bedrock_agent.invoke_agent(
        agentId='YOUR_AGENT_ID',
        agentAliasId='YOUR_ALIAS_ID',
        sessionId=body.get('sessionId', 'default'),
        inputText=prompt
    )
    
    # Process response
    paper = extract_paper_content(response)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'paper': paper,
            'sessionId': response.get('sessionId')
        })
    }
```

### 2. Set Up API Gateway

Create REST API endpoints:

```
POST /api/search        → Search Papers Lambda
POST /api/summarize     → Summarize Papers Lambda
POST /api/write         → Write Papers Lambda
```

**CORS Configuration:**
```json
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
}
```

### 3. Environment Variables

Set these in your Lambda functions:

```
BEDROCK_AGENT_ID=your-agent-id
BEDROCK_AGENT_ALIAS_ID=your-alias-id
AWS_REGION=us-east-1
```

## Frontend Integration

### 1. Create API Client

Create `src/lib/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-api-gateway-url.amazonaws.com/prod';

export interface SearchRequest {
  query: string;
  sessionId?: string;
}

export interface SummarizeRequest {
  content: string;
  sessionId?: string;
}

export interface WriteRequest {
  topic: string;
  outline?: string;
  sessionId?: string;
}

export const api = {
  searchPapers: async (request: SearchRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error('Search failed');
    }
    
    return response.json();
  },

  summarizePaper: async (request: SummarizeRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error('Summarization failed');
    }
    
    return response.json();
  },

  writePaper: async (request: WriteRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/write`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error('Paper generation failed');
    }
    
    return response.json();
  },
};
```

### 2. Update Components

#### SearchSection.tsx
Replace the TODO comment with:

```typescript
import { api } from "@/lib/api";

const handleSearch = async () => {
  if (!query.trim()) {
    toast({
      title: "Please enter a search query",
      variant: "destructive",
    });
    return;
  }

  setIsSearching(true);
  
  try {
    const results = await api.searchPapers({ query });
    // Display results
    setSearchResults(results.results);
    toast({
      title: "Search complete",
      description: `Found ${results.results.length} papers`,
    });
  } catch (error) {
    toast({
      title: "Search failed",
      description: "Please try again",
      variant: "destructive",
    });
  } finally {
    setIsSearching(false);
  }
};
```

#### SummarizeSection.tsx
Replace the TODO comment with:

```typescript
import { api } from "@/lib/api";

const handleSummarize = async () => {
  if (!paperText.trim()) {
    toast({
      title: "Please provide paper content",
      variant: "destructive",
    });
    return;
  }

  setIsSummarizing(true);
  
  try {
    const result = await api.summarizePaper({ content: paperText });
    setSummary(result.summary);
    toast({
      title: "Summarization complete",
    });
  } catch (error) {
    toast({
      title: "Summarization failed",
      description: "Please try again",
      variant: "destructive",
    });
  } finally {
    setIsSummarizing(false);
  }
};
```

#### WriteSection.tsx
Replace the TODO comment with:

```typescript
import { api } from "@/lib/api";

const handleGeneratePaper = async () => {
  if (!topic.trim()) {
    toast({
      title: "Please enter a topic",
      variant: "destructive",
    });
    return;
  }

  setIsWriting(true);
  
  try {
    const result = await api.writePaper({ topic, outline });
    setGeneratedPaper(result.paper);
    toast({
      title: "Paper generated successfully",
    });
  } catch (error) {
    toast({
      title: "Generation failed",
      description: "Please try again",
      variant: "destructive",
    });
  } finally {
    setIsWriting(false);
  }
};
```

### 3. Environment Variables

Create `.env.local`:

```
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com/prod
```

## Testing

### 1. Test Backend
```bash
# Test search endpoint
curl -X POST https://your-api-gateway-url.amazonaws.com/prod/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "machine learning"}'
```

### 2. Test Frontend
1. Start the development server: `npm run dev`
2. Navigate to each section
3. Test each feature with sample data

## Deployment Checklist

- [ ] Lambda functions deployed
- [ ] API Gateway configured with CORS
- [ ] Environment variables set
- [ ] Frontend environment variables configured
- [ ] API endpoints tested
- [ ] Frontend connected and tested
- [ ] Error handling implemented
- [ ] Loading states working
- [ ] Session management (if needed)

## Monitoring

### CloudWatch Metrics
- Lambda invocations
- API Gateway requests
- Error rates
- Response times

### Frontend Monitoring
- Use browser DevTools to monitor API calls
- Check console for errors
- Monitor network requests

## Security Considerations

1. **API Authentication**: Add API keys or AWS Cognito
2. **Rate Limiting**: Implement in API Gateway
3. **Input Validation**: Validate all inputs in Lambda
4. **CORS**: Configure properly for your domain
5. **Secrets**: Use AWS Secrets Manager for sensitive data

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS is configured in API Gateway
   - Check response headers

2. **Lambda Timeouts**
   - Increase timeout in Lambda settings
   - Optimize agent response time

3. **Authentication Errors**
   - Verify Bedrock permissions
   - Check IAM roles

## Next Steps

1. Implement session management for context
2. Add file upload for PDF papers
3. Implement paper export (PDF, Word)
4. Add citation management
5. Implement collaborative features

## Support

For issues or questions:
- AWS Bedrock Documentation: https://docs.aws.amazon.com/bedrock/
- Project Repository: [Your GitHub repo]
- Contact: [Your contact info]
