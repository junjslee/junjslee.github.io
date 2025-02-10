// src/components/BlogSection.tsx
import React from 'react'
import BlogPostCard from './BlogPostCard'

const posts = [
  {
    slug: "post-1",
    title: "Walking the Tightrope: Balancing Integrity and Survival",
    content: 
    `
    Yesterday, as I watched the unfolding political drama in South Korea, a moment struck me with profound clarity. It wasn't just the weight of a nation grappling with a leadership crisis or the cacophony of impassioned protestors in the streets. It was the quiet yet strategic move by this one politician, Sangwook Kim/김상욱, that left me thinking deeply about survival—not just in politics, but in life itself. 
    
    Kim, a member of the president's party—국민의 힘/People Power Party (PPP), walked into the parliament and cast his vote. While the rest of his party boycotted the impeachment proceedings in solidarity with their leader, Kim chose a different path. He neither fully abandoned his party nor completely aligned himself with the opposition. Instead, he stood at the crossroads, saying all the right things to appease both sides while positioning himself as a voice of reason. He admitted that President Yoon’s actions were indefensible but refrained from supporting impeachment outright, leaving open the possibility of doing so in the future. 
    
    To some, his actions might seem duplicitous—a calculated move to maintain his status. To others, it might seem wise, a way to fulfill his duty without alienating either side. But to me, it raised an age-old question: When faced with difficult choices, especially in organizations where power and survival often collide, how do we decide between taking a firm stand and navigating the middle ground? 
    
    In politics, as in life, survival often demands compromise. Companies, institutions, and even families operate as microcosms of this reality. There are times when standing resolutely by your principles can cost you dearly—alienating colleagues, losing opportunities, or burning bridges that may one day need crossing. On the other hand, playing the game too cautiously risks your integrity, leaving a shadow of doubt about who you truly are. 
    
    Kim’s maneuver reminded me of the delicate balance required in such moments. By participating in the vote, he fulfilled his duty to the people and to democracy, avoiding the accusation of cowardice. Yet, by not supporting impeachment, he stayed aligned with his party’s official stance. He navigated the situation in a way that might minimize damage to his political career while keeping his options open. It was, as many might see it, a SMART move. 
    
    But is survival enough? Is it worth the cost of being seen as insincere or opportunistic? There is no clear answer because the question itself is layered with complexity. It touches on values, circumstances, and the roles we play in the systems we are part of. In some situations, a firm stand might inspire change, rallying others to your cause. In others, it might isolate you, rendering your stance ineffective. 
    
    So, when should we choose sides, and when should we seek a middle path? Should we aim for survival, or should we risk it all for what we believe to be right? These are questions without easy answers, questions that depend on the stakes, the people involved, and the potential outcomes. 
    
    Watching Kim, I couldn’t help but wonder what I would have done in his place. Could I have navigated the waters as cleverly, or would I have taken a stand, regardless of the consequences? Life is full of these moments—at work, in friendships, and even in our families—when we must weigh our principles against practicality. 
    
    In the end, survival in an organization—or in any system—is a game of perception and timing. But as I reflect, I realize that survival without integrity can leave an emptiness that no position, power, or status can fill. Yet, integrity without strategy can lead to isolation, a noble voice drowned in the cacophony of competing interests. 
    
    Maybe the answer lies somewhere in the middle. Not in being opportunistic, but in being adaptable. Not in abandoning principles, but in wielding them with wisdom. For Kim, time will tell if his decision was a moment of brilliance or just another calculation. For me, his story is a reminder that life’s most complex situations rarely have simple solutions. Perhaps, the act of navigating them itself is what it means to truly survive.
    `,
    excerpt: "Yesterday, as I watched the unfolding political drama in South Korea, a moment struck me with profound clarity...",
    date: "2024-12-08",
  },
  {
    slug: "post-2",
    title: "What makes your heart beat",
    content: 
    `
    Today, during the weekly KATUSA meeting, my mind was elsewhere. I was zoning out, waiting for it to end, but then, something the commander said pulled me back to reality. He was recounting a story—an ordinary moment turned extraordinary.
    
    He spoke about a visit over the weekend to a barber shop just outside the army base's walk-in gate, a place called "For Men." The barber, an old man with a gentle demeanor, had been chatting with him. It started casually: "What did you do over the weekend?" The commander expected a short reply, maybe a polite chuckle, but instead, the man’s face lit up. He started talking about fishing.
    
    The way the old man described it, fishing wasn’t just a hobby—it was his heartbeat. The excitement in his voice painted a picture of still waters, the tug of a line, and the serene joy of waiting for a bite. The commander, sensing the man’s passion, listened. Then came the unexpected twist: the barber turned the question around. "What about you? Do you have something that makes your heartbeat?"
    
    Hearing this, I felt a jolt. That question, so simple yet profound, gripped me. Usually, I’d have an answer—writing about philosophical questions about life on my blog, playing soccer or basketball—but today, I came up blank. For a moment, I felt lost, as if I’d forgotten what it meant to truly feel alive.
    
    This month, I became a CPL6--4 months away from getting discharged, and I’ve been coasting—winging my days in the army, going through the motions. But the barber’s question stayed with me. It’s a question I owe myself an answer to: What makes my heartbeat right now? 

    Anyway, after the meeting, I played soccer with some of the guys. On my way to the field, the question followed me, unraveling memories like threads from a spool. I remembered the boy I was—a kid who poured his heart into soccer, chemistry, even writing. I was curious about everything, trying one thing after another, chasing what made me feel alive.

    Lately, it’s been billiards—a new hobby, another way to unwind and explore. But life isn’t just hobbies anymore. In my early 20s, on the cusp of starting a career after the army, there’s a weight to the choices ahead. I want financial stability, but I also want happiness. The kind of happiness that comes from doing things that make my heart beat. So where do I draw the line?

    Right now, I’m studying AI, diving into math to grasp complex concepts, and building skills that feel like stepping stones to something greater. But honestly, I don’t know exactly where I’m going yet. That used to scare me, but now I see it differently. It’s okay to feel lost sometimes. Writing helps me untangle the knots in my thoughts.

    I’ve realized that consistency is my key—showing up for myself, one step at a time, even if I don’t have all the answers. The boy who loved soccer, science, and music didn’t have answers either. He just followed what made him curious. Maybe that’s all I need to do now: keep walking, keep trying, and keep finding joy in the little things that make my heart beat.
    `,
    excerpt: "Today, during a KATUSA meeting, my mind wandered until it didn't. The commander's story of a barber...",
    date: "2024-12-04",
  },
]

const BlogSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <div className="space-y-8">
        {posts.map((post, index) => (
          <BlogPostCard key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export default BlogSection
