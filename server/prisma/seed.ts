import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Hash passwords
  const password1 = await bcrypt.hash('password123', 10);
  const password2 = await bcrypt.hash('securepass456', 10);

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      username: 'user1',
      password: password1,
      bio: 'I love writing articles.',
      image: 'https://example.com/avatar1.png',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      username: 'user2',
      password: password2,
      bio: 'Tech enthusiast and writer.',
      image: 'https://example.com/avatar2.png',
    },
  });

  // Create articles
  const articles = [
    {
      title: 'Introduction to Prisma',
      slug: 'introduction-to-prisma',
      description: 'Learn how to use Prisma ORM with a real-world example.',
      body: 'Prisma is a next-generation ORM that simplifies database interaction with powerful features, including migrations, schema management, and data fetching, making it an excellent choice for developers looking for an easier way to work with databases.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Prisma'}, {tagName: 'ORM'}],
    },
    {
      title: 'TypeScript Best Practices',
      slug: 'typescript-best-practices',
      description: 'Best practices for writing TypeScript code.',
      body: 'Using TypeScript can improve your code quality by catching errors early. Best practices include using strict mode, leveraging type definitions, and avoiding the "any" type to ensure more reliable and maintainable code in the long run.',
      authorUsername: user2.username,
      tagList: [{tagName: 'TypeScript'}, {tagName: 'Best Practices'}],
    },
    {
      title: 'The Benefits of Morning Routines',
      slug: 'benefits-of-morning-routines',
      description:
        'Why creating a morning routine can boost productivity and well-being.',
      body: 'A morning routine helps set the tone for your entire day. Whether it’s exercise, meditation, or reading, starting your day with intention can improve mental clarity and overall productivity.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Morning Routine'}, {tagName: 'Productivity'}],
    },
    {
      title: 'How to Manage Personal Finances',
      slug: 'managing-personal-finances',
      description: 'Tips for budgeting, saving, and investing your money.',
      body: 'Managing personal finances is essential for financial stability. By creating a budget, tracking expenses, and planning for long-term goals like retirement or purchasing property, you can build a secure financial future.',
      authorUsername: user2.username,
      tagList: [{tagName: 'Finance'}],
    },
    {
      title: 'The Science of Happiness',
      slug: 'science-of-happiness',
      description:
        'What research says about finding happiness and fulfillment.',
      body: 'Research shows that happiness is often linked to positive relationships, gratitude, and self-acceptance. Understanding the science of happiness can help you focus on habits that lead to a more fulfilling life.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Happiness'}, {tagName: 'Psychology'}],
    },
    {
      title: 'How to Improve Your Communication Skills',
      slug: 'improve-communication-skills',
      description:
        'Tips for effective communication in both professional and personal life.',
      body: 'Effective communication is essential in both personal and professional settings. Active listening, being clear and concise, and maintaining empathy are key components to building strong relationships.',
      authorUsername: user2.username,
      tagList: [{tagName: 'Communication'}, {tagName: 'Skills'}],
    },
    {
      title: 'The Power of Positive Thinking',
      slug: 'power-of-positive-thinking',
      description: 'How changing your mindset can lead to greater success.',
      body: 'Positive thinking can help overcome challenges and lead to success. By focusing on solutions rather than problems, you can cultivate resilience and improve your mental health, ultimately leading to better results in life.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Mindset'}, {tagName: 'Positivity'}],
    },
    {
      title: 'A Beginner’s Guide to Meditation',
      slug: 'beginners-guide-to-meditation',
      description:
        'Learn the basics of meditation and how it can reduce stress.',
      body: 'Meditation is a practice that can help reduce stress and improve mental clarity. By focusing on your breath or a mantra, you can calm your mind, reduce anxiety, and increase overall well-being.',
      authorUsername: user2.username,
      tagList: [{tagName: 'Meditation'}, {tagName: 'Mindfulness'}],
    },
    {
      title: 'Sustainable Living: Small Changes That Make a Big Impact',
      slug: 'sustainable-living',
      description:
        'How small changes in your daily life can help the environment.',
      body: 'Living sustainably doesn’t require radical changes. Simple actions like reducing waste, conserving energy, and opting for eco-friendly products can significantly reduce your environmental impact.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Sustainability'}, {tagName: 'Environment'}],
    },
    {
      title: 'The Importance of Sleep for Health',
      slug: 'importance-of-sleep',
      description: 'Why sleep is essential for physical and mental well-being.',
      body: 'Getting quality sleep is crucial for maintaining physical health, mental clarity, and emotional balance. It aids in memory, boosts immunity, and supports mental health, making it an essential part of a healthy lifestyle.',
      authorUsername: user2.username,
      tagList: [{tagName: 'Sleep'}, {tagName: 'Health'}],
    },
    {
      title: 'How to Build Strong Relationships',
      slug: 'building-relationships',
      description:
        'Guidelines for cultivating meaningful connections with others.',
      body: 'Strong relationships are built on trust, communication, and respect. By fostering empathy, being a good listener, and being present, you can nurture deep and lasting connections with others.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Relationships'}, {tagName: 'Trust'}],
    },
    {
      title: 'Time Management for Busy People',
      slug: 'time-management',
      description:
        'Strategies to manage your time effectively and reduce stress.',
      body: 'Time management is key to productivity. Prioritizing tasks, setting realistic deadlines, and breaking down larger projects into manageable steps can help you stay organized and reduce stress.',
      authorUsername: user2.username,
      tagList: [{tagName: 'Time Management'}],
    },
    {
      title: 'The Future of Renewable Energy',
      slug: 'future-of-renewable-energy',
      description: 'How renewable energy sources are shaping our world.',
      body: 'Renewable energy sources, such as solar and wind power, are rapidly advancing. These technologies are helping reduce carbon emissions, combat climate change, and provide a sustainable future for generations to come.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Renewable Energy'}, {tagName: 'Future'}],
    },
    {
      title: 'How to Stay Motivated During Difficult Times',
      slug: 'staying-motivated',
      description:
        'Tips for maintaining motivation and focus during tough periods.',
      body: 'Staying motivated during tough times requires resilience, adaptability, and support. Focusing on small, achievable goals and surrounding yourself with a supportive community can help you stay on track.',
      authorUsername: user2.username,
      tagList: [{tagName: 'Motivation'}, {tagName: 'Resilience'}],
    },
    {
      title: 'Traveling on a Budget',
      slug: 'traveling-on-a-budget',
      description: 'How to travel without breaking the bank.',
      body: 'Traveling on a budget is possible with planning. Look for affordable accommodation, use public transport, and explore free attractions to make the most of your trip without overspending.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Travel'}, {tagName: 'Budgeting'}],
    },
    {
      title: 'Mindful Eating: A Guide to Healthy Habits',
      slug: 'mindful-eating',
      description: 'How to practice mindful eating for better health.',
      body: 'Mindful eating involves paying attention to your food and how it makes you feel. By slowing down, savoring each bite, and listening to your body’s hunger cues, you can improve digestion and overall health.',
      authorUsername: user2.username,
      tagList: [{tagName: 'Eating'}],
    },
    {
      title: 'The Benefits of Volunteering',
      slug: 'benefits-of-volunteering',
      description:
        'How volunteering can improve your life and the lives of others.',
      body: 'Volunteering can foster a sense of community and improve personal well-being. Giving back helps develop empathy, and research shows that helping others can also increase happiness and life satisfaction.',
      authorUsername: user1.username,
      tagList: [{tagName: 'Volunteering'}, {tagName: 'Community'}],
    },
  ];

  await Promise.all(
    articles.map(async (article) => {
      await prisma.article.create({
        data: {
          ...article,
          tagList: {create: article.tagList},
        },
      });
    })
  );

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
