# ASDgroup10
Group project for UTS Advanced Software Development subject.

Current proposed project is an AI Hub website

Tech Stack: Next.js 13, React, Tailwind, Prise, Clerk Auth, Stripe

How to start the dev server

cd into ai-hub folder

``` npm install ```
and then 
``` npm run dev ```

How to start testing using Jest

cd into ai-hub folder

``` npm run test ```

## Feature Allocations
### Charlie Huang
**Login/Register**  
ai-hub/app/(auth)  
ai-hub/app/(landing)

**Dashboard**  
ai-hub/app/(dashboard)/(routes)/dashboard  
ai-hub/app/(dashboard)/(routes)/settings

### Ruoxi Jiang
**Code Generation**  
ai-hub/app/(dashboard)/(routes)/code  
ai-hub/app/api/code

**Conversation/Text Generation**  
ai-hub/app/(dashboard)/(routes)/conversation  
ai-hub/app/api/conversation

### Kevin Yu
**Image Generation**  
ai-hub/app/(dashboard)/(routes)/image  
ai-hub/app/api/image

**Video Generation**  
ai-hub/app/(dashboard)/(routes)/video  
ai-hub/app/api/video

### Malcolm McCredie
**Music Generation**  
ai-hub/app/(dashboard)/(routes)/music  
ai-hub/app/api/music

**Customer Support**  
ai-hub/app/(dashboard)/(routes) (every page has floating support button)
ai-hub/components/SupportConsole.tsx

### William Herman
**Pro Subscription**  
ai-hub/app/(dashboard)/(routes)/dashboard

**Refresh**
