// Demo data initialization for development
export const initializeDemoData = () => {
  // Check if demo data already exists
  if (localStorage.getItem('gdg_demo_initialized')) {
    return;
  }

  // Demo users
  const demoUsers = [
    {
      id: '1',
      name: 'John Developer',
      email: 'demo@example.com',
      password: 'demo123',
      createdAt: new Date('2024-01-15').toISOString()
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      createdAt: new Date('2024-02-10').toISOString()
    }
  ];

  // Demo blogs
  const demoBlogs = [
    {
      id: '1',
      title: 'Getting Started with React and Vite',
      content: `React and Vite make a powerful combination for modern web development. Vite provides lightning-fast development experience with hot module replacement, while React gives us the component-based architecture we love.

In this blog, I'll share my experience building applications with this stack and some best practices I've learned along the way.

## Why Vite?

Vite offers several advantages over traditional build tools:
- **Fast cold start**: No bundling required during development
- **Hot Module Replacement**: Instant updates without losing state  
- **Optimized builds**: Production builds are highly optimized
- **Rich ecosystem**: Great plugin ecosystem and framework integration

## Setting Up Your Project

Getting started is incredibly simple:

\`\`\`bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
\`\`\`

And you're ready to go! The development server starts in milliseconds, not seconds.

## Best Practices

Here are some tips I've learned:

1. **Use TypeScript**: Even for small projects, TypeScript catches errors early
2. **Leverage Vite plugins**: There are plugins for almost everything
3. **Optimize imports**: Use dynamic imports for code splitting
4. **Configure your IDE**: Set up your editor for the best development experience

## Conclusion

React + Vite is an excellent choice for modern web applications. The developer experience is fantastic, and the performance benefits are real.

Happy coding!`,
      authorId: '1',
      authorName: 'John Developer',
      createdAt: new Date('2024-03-01').toISOString(),
      updatedAt: new Date('2024-03-01').toISOString()
    },
    {
      id: '2',
      title: 'The Future of Web Development: Trends to Watch',
      content: `The web development landscape is constantly evolving. As we move forward, several trends are shaping how we build applications and user experiences.

## 1. Server-Side Rendering (SSR) Renaissance

With frameworks like Next.js, Nuxt.js, and SvelteKit, SSR is making a strong comeback. The benefits are clear:
- Better SEO performance
- Faster initial page loads
- Improved user experience

## 2. Edge Computing and CDNs

Moving computation closer to users is becoming increasingly important:
- Reduced latency
- Better global performance
- More resilient applications

## 3. WebAssembly (WASM) Adoption

WebAssembly is opening new possibilities:
- Near-native performance in browsers
- Bringing other languages to the web
- Complex applications running client-side

## 4. AI-Powered Development Tools

AI is revolutionizing how we code:
- Intelligent code completion
- Automated testing
- Code review assistance
- Bug detection and fixes

## 5. Progressive Web Apps (PWAs)

PWAs continue to bridge the gap between web and native:
- Offline functionality
- Push notifications
- Native-like experiences
- Cross-platform compatibility

## Conclusion

The future of web development is exciting and full of possibilities. Staying updated with these trends will help us build better, more efficient applications.

What trends are you most excited about? Let me know in the comments!`,
      authorId: '2',
      authorName: 'Jane Smith',
      createdAt: new Date('2024-03-05').toISOString(),
      updatedAt: new Date('2024-03-05').toISOString()
    },
    {
      id: '3',
      title: 'Building Responsive Layouts with Tailwind CSS',
      content: `Tailwind CSS has revolutionized how I approach styling. Its utility-first approach makes building responsive layouts intuitive and maintainable.

## Why Tailwind CSS?

After years of writing custom CSS and using various frameworks, Tailwind feels like a breath of fresh air:

- **Utility-first**: No more naming classes or worrying about CSS specificity
- **Responsive design**: Built-in responsive modifiers make mobile-first design easy
- **Consistency**: Design system built right into your utility classes
- **Performance**: Only the styles you use get included in your final bundle

## Responsive Design Made Easy

One of Tailwind's strongest features is its approach to responsive design:

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Content automatically adapts to screen size -->
</div>
\`\`\`

The mobile-first approach means you start with mobile styles and add larger screen styles as needed.

## Common Patterns

Here are some responsive patterns I use frequently:

### Navigation
- Mobile: Hamburger menu
- Desktop: Horizontal navigation

### Cards
- Mobile: Single column
- Tablet: Two columns  
- Desktop: Three or four columns

### Typography
- Mobile: Smaller, more compact text
- Desktop: Larger, more spacious text

## Tips for Success

1. **Start mobile-first**: Design for small screens first
2. **Use the responsive prefixes**: sm:, md:, lg:, xl:, 2xl:
3. **Leverage Tailwind's spacing scale**: Consistent spacing across breakpoints
4. **Test on real devices**: Emulators are good, but real devices are better

## Conclusion

Tailwind CSS makes responsive design approachable and maintainable. Once you get used to the utility-first approach, you'll wonder how you ever built layouts without it.

Give it a try on your next project – you might be surprised how much you enjoy it!`,
      authorId: '1',
      authorName: 'John Developer',
      createdAt: new Date('2024-03-10').toISOString(),
      updatedAt: new Date('2024-03-12').toISOString()
    }
  ];

  // Store demo data
  localStorage.setItem('gdg_users', JSON.stringify(demoUsers));
  localStorage.setItem('gdg_blogs', JSON.stringify(demoBlogs));
  localStorage.setItem('gdg_demo_initialized', 'true');

  console.log('Demo data initialized successfully!');
};