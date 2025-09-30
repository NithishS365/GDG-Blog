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
      name: 'Nithish',
      email: 'demo@example.com',
      password: 'demo123',
      createdAt: new Date('2024-01-15').toISOString()
    },
    {
      id: '2',
      name: 'Srinish',
      email: 'srinish@example.com',
      password: 'password123',
      createdAt: new Date('2024-02-10').toISOString()
    },
    {
      id: '3',
      name: 'Kavitha',
      email: 'kavitha@example.com',
      password: 'password123',
      createdAt: new Date('2024-01-25').toISOString()
    }
  ];

  // Demo blogs with interesting topics
  const demoBlogs = [
    {
      id: '1',
      title: 'The Psychology Behind Social Media Addiction',
      content: `Have you ever wondered why you can't put your phone down? Social media platforms are designed using psychological principles that trigger dopamine release in our brains. Every notification, like, and comment creates a small reward that keeps us coming back for more. Understanding these mechanisms can help us develop healthier relationships with technology. The intermittent reinforcement schedule used by these platforms is the same principle that makes gambling addictive. By recognizing these patterns, we can take control of our digital habits and use technology more mindfully.`,
      authorId: '1',
      authorName: 'Nithish',
      createdAt: new Date('2024-03-01').toISOString(),
      updatedAt: new Date('2024-03-01').toISOString()
    },
    {
      id: '2',
      title: 'Climate Change: Small Actions, Big Impact',
      content: `Climate change might seem overwhelming, but individual actions collectively make a significant difference. Simple changes like reducing meat consumption, using public transport, and switching to renewable energy can reduce your carbon footprint dramatically. Did you know that if everyone replaced just one car trip per week with cycling or walking, global CO2 emissions would drop by millions of tons annually? The key is consistency and inspiring others through your actions. Start small: carry a reusable water bottle, shop locally, and choose products with minimal packaging. Every eco-friendly choice is a vote for the planet's future.`,
      authorId: '2',
      authorName: 'Srinish',
      createdAt: new Date('2024-03-05').toISOString(),
      updatedAt: new Date('2024-03-05').toISOString()
    },
    {
      id: '3',
      title: 'The Art of Mindful Living in a Chaotic World',
      content: `In our fast-paced world, mindfulness has become more essential than ever. It's not about meditation retreats or complicated practices—it's about being present in everyday moments. Whether you're drinking morning coffee, walking to work, or having a conversation, mindfulness means fully engaging with the experience. Research shows that just 10 minutes of daily mindful breathing can reduce stress hormones by 30%. The beauty of mindfulness lies in its simplicity: notice your breath, observe your thoughts without judgment, and appreciate small moments. This practice can transform ordinary experiences into sources of peace and clarity.`,
      authorId: '3',
      authorName: 'Kavitha',
      createdAt: new Date('2024-03-10').toISOString(),
      updatedAt: new Date('2024-03-10').toISOString()
    }
    
  ];

  // Store demo data
  localStorage.setItem('gdg_users', JSON.stringify(demoUsers));
  localStorage.setItem('gdg_blogs', JSON.stringify(demoBlogs));
  localStorage.setItem('gdg_demo_initialized', 'true');

  console.log('Demo data initialized successfully!');
};