import React,{useEffect,useState} from 'react';
import { useRouter } from 'next/navigation';
const TeamsPage = ({team}) => {
  const router = useRouter();

  console.log(team);
  const teamValues={
    Tech:`The Technical Team at Shrinik Club, GL Bajaj, Greater Noida, is dedicated to leveraging technology to build impactful solutions. Our team consists of skilled developers, engineers, and innovators who work on web development, app development, AI, ML, cybersecurity, cloud computing, and blockchain. We focus on creating smart, efficient, and scalable solutions for real-world challenges.
Collaboration is at our core—we work closely with designers, marketers, and strategists to ensure a seamless tech experience. We actively participate in hackathons, research projects, and coding competitions, fostering a culture of learning and innovation.
We believe in continuous growth, staying updated with the latest technologies through workshops and mentorship. Our commitment to integrity and impact-driven solutions drives us to build reliable and high-quality tech products. At Shrinik Club, GL Bajaj, Greater Noida, our team is shaping the future with technology and innovation. 🚀
`,
    Design:`The design team plays a crucial role in shaping the visual identity of our projects. We believe that great design is not just about aesthetics but also about functionality and user experience. Our designers blend creativity with strategy, ensuring that every visual element serves a purpose. From branding and user interfaces to marketing materials and motion graphics, we meticulously craft designs that leave a lasting impact.
We stay ahead of industry trends, incorporating modern design principles and emerging technologies into our work. Collaboration is at the heart of our process—designers work closely with developers, marketers, and content creators to bring ideas to life in a cohesive and compelling way.
Every design project starts with research and brainstorming, where we gather insights and refine concepts to align with our brand vision. We then experiment with typography, color theory, and composition to create visually appealing and meaningful designs. Feedback and iteration are key to our workflow, as we continuously refine our work to ensure the highest quality. Ultimately, our goal is to create designs that not only look stunning but also communicate effectively, resonate with our audience, and enhance user engagement across various platforms.`,
    Photography:`Photography is more than just capturing images—it’s about telling stories, evoking emotions, and preserving moments in time. Our photography team is dedicated to producing high-quality visuals that reflect the essence of our brand and mission. Whether it's event coverage, product photography, or creative editorial shoots, we approach every project with an artistic and technical mindset.
We specialize in composition, lighting, and post-processing techniques to ensure our photographs stand out. Our team explores different photography styles, including portrait, landscape, documentary, and abstract photography, to capture diverse perspectives. Attention to detail is critical in our work, as we aim to create images that are not only visually stunning but also meaningful and impactful.
Beyond just taking photos, we focus on storytelling—each image should communicate a message or convey an emotion. We also embrace innovation, incorporating drone photography, 360-degree shots, and AI-powered enhancements to push the boundaries of visual storytelling.
Collaboration is key to our process; we work closely with designers, marketers, and social media teams to ensure our photographs align with brand campaigns. Our ultimate goal is to create timeless visuals that inspire, engage, and leave a lasting impression on our audience.`,
    Media:`The media team serves as the bridge between our organization and the world. We craft compelling narratives and distribute content through various channels to ensure our message reaches the right audience. Our work includes content creation, social media management, video production, and digital storytelling.
We understand the power of media in shaping public perception and engagement. Whether it’s a promotional video, a press release, or a podcast, we ensure every piece of content aligns with our brand identity and core values. We leverage platforms like YouTube, Instagram, LinkedIn, and Twitter to amplify our reach and maintain an active online presence.
Creativity and strategy go hand in hand in our team. We analyze audience behavior, track trends, and optimize content to maximize impact. Data-driven decision-making is an integral part of our process, allowing us to refine our approach and enhance engagement.
We also focus on community building, engaging with audiences through interactive content, live sessions, and collaborative projects. By combining storytelling, technology, and strategic communication, we create media that not only informs and entertains but also strengthens our brand’s presence in the digital world.`,
    Marketing:`Our marketing team thrives on innovation and strategy, crafting campaigns that capture attention and drive engagement. We are storytellers at heart, blending creativity with data analytics to create impactful brand experiences. From digital marketing and social media strategies to offline promotions and influencer collaborations, we employ a multi-channel approach to maximize reach and effectiveness.
We focus on audience insights, researching consumer behavior, preferences, and trends to develop targeted marketing campaigns. Our expertise includes content marketing, SEO optimization, email campaigns, and paid advertising strategies to enhance brand visibility. Every campaign is carefully designed to not only attract but also retain and engage our audience.
Collaboration is a key pillar of our process—we work closely with designers, content creators, and developers to ensure seamless execution. A/B testing and performance tracking are integral to our workflow, enabling us to refine our strategies based on real-time data.
Beyond just selling a product or service, we aim to build a strong brand identity and community. Our marketing efforts are not only about promotion but also about creating meaningful connections with our audience, fostering brand loyalty, and driving long-term success.

`,
    Management:`The management team is the backbone of our organization, ensuring smooth operations, effective collaboration, and strategic execution. We oversee project timelines, resource allocation, and workflow optimization to maintain efficiency and productivity.
Our work involves coordinating between various teams, setting objectives, and ensuring that all projects align with the organization’s mission and goals. Leadership and communication are at the core of our responsibilities, as we facilitate teamwork and resolve challenges.
We prioritize structure and organization, utilizing project management tools and methodologies to track progress, allocate responsibilities, and optimize efficiency. Decision-making is data-driven, allowing us to identify areas for improvement and implement solutions that enhance performance.
Risk management and problem-solving are key aspects of our role. We anticipate challenges, develop contingency plans, and adapt to changing circumstances to maintain stability. In addition to operational management, we focus on team development, fostering a positive work culture, and ensuring that members have the necessary resources and support to excel.
Ultimately, our goal is to create a well-structured, motivated, and forward-thinking team that works seamlessly to achieve both short-term and long-term objectives while upholding the highest standards of excellence.`,
    Editorial:`The editorial team plays a crucial role in shaping the voice and narrative of our brand. We are responsible for content creation, editing, and ensuring that all written materials maintain clarity, consistency, and impact. Whether it's blogs, newsletters, reports, or website content, we strive to craft compelling and well-researched pieces that resonate with our audience.
Our work begins with thorough research and ideation, ensuring that every piece of content is informative, engaging, and aligned with our brand’s message. We focus on storytelling, structuring articles in a way that captures interest and delivers value. Attention to detail is a priority, as we carefully edit for grammar, style, and coherence.
Beyond writing, we oversee content strategy, ensuring that messaging remains consistent across all platforms. We collaborate with designers, marketers, and media teams to enhance the visual and interactive elements of our content.
SEO optimization and audience engagement are integral to our strategy, helping us reach a wider audience and maximize impact. Ultimately, our goal is to inform, inspire, and connect with readers through well-crafted, insightful, and meaningful content.`,

  }
  const [pic1,setPic1]=useState('');
  const [pic2,setPic2]=useState('');
  const [director,setDirector]=useState({
    name:'',
    email:'',
    phone:'',
    linkedinUrl:''
  });
  const [codirector,setCodirector]=useState({
    name:'',
    email:'',
    phone:'',
    linkedinUrl:''

  })
  const [memberList,setMemberList]=useState([]);
   const homevisit=()=>{
      router.push('/');
    };
  useEffect(()=>{
    const fetchpics= async()=>{
      try{  
        const res = await fetch('https://shrinik-project.onrender.com/api/getGallary');
        const data = await res.json();
        console.log('Fetched pic:', data); // Log the fetched data
        if (Array.isArray(data)) {
          const filtered = data.filter(e => e.ImageFor === `${team} Director`);
          setPic1(filtered[0].imageUrl);
          console.log("image",);
          const filtered2 = data.filter(e => e.ImageFor === `${team} Codirector`);
          setPic2(filtered2[0].imageUrl);
          
        } else {
          console.error('Fetched data is not an array:', data);
        } 
      }catch(error){
        console.log("error fetching images",error);
      }
    }
    const fetchDirector=async(team)=>{
      try{
        const res=await fetch(`https://shrinik-project.onrender.com/api/getDirector/${team}`);//passteam ame to identify team
        const data=await res.json();
        if (Array.isArray(data)) {
        const filterDirector=data.filter(e=>e.Post==='Director');
        const filterCodirector=data.filter(e=>e.Post==='Codirector');
        console.log(filterDirector[0].name);
        const info1={
            name:filterDirector[0].name,
            email:filterDirector[0].email,
            phone:filterDirector[0].phone,
            linked:filterDirector[0].linkedinUrl
          };
          setDirector(info1);
          const info2={
            name:filterCodirector[0].name,
            email:filterCodirector[0].email,
            phone:filterCodirector[0].phone,
            linked:filterCodirector[0].linkedinUrl
          };
        
        setCodirector(info2);}
        else{console.log("data is not array");}
      }catch(err){
        console.log("errorfetching director",err);
      }
    }
   
    const fetchmembers=async(team)=>{
      try{
          const res=await fetch(`https://shrinik-project.onrender.com/api/getMembers/${team}`);//passteam name
          const data=await res.json();
         console.log(data);
          setMemberList(data);

      }catch(error){
        console.log("error fetching members",error);
      }
    }
    fetchpics();
    fetchmembers(team);
    fetchDirector(team);
  },[team]);
  return (
    <div className="text-center font-sans p-8 bg-gradient-to-r from-red-900 to-blue-900 min-h-screen text-white animate-gradient">
      <button onClick={homevisit}>'</button>
      <h1 className="text-4xl mb-8">Meet Our {team ? `${team} ` : ""}Team</h1>

      <div className="flex flex-col md:flex-row justify-center gap-10 mb-10">
        {/* Director Card */}
        <div className="border-2 border-yellow-400 rounded-lg p-5 w-64 shadow-lg bg-white bg-opacity-90 transform transition duration-300 hover:scale-105 text-blue-400">
          <img src={pic1 || "/images/directorDefault.webp"}  className="rounded-full mb-4 h-50"/>
          <h3 className="text-xl text-indigo-700">{director.name||'Director name'}</h3>
          <p className="text-indigo-700">Team Director</p>
          <p>Email: {director.email||'abc@gmail.com'}</p>
          <p>Phone: {director.phone||'0000000000'}</p>
          <a href={director.linkedinUrl ? `https://${director.linkedinUrl}` : '#'} target="_blank" rel="noopener noreferrer">
          LinkedIn
          </a>
        </div>

        {/* Co-Director Card */}
        <div className="border-2 border-yellow-400 rounded-lg p-5 w-64 shadow-lg bg-white bg-opacity-90 transform transition duration-300 hover:scale-105 text-blue-400">
          <img src={pic2||"/images/codirectorDefault.webp"} alt="Co-Director" className="rounded-full mb-4 h-50" />
          <h3 className="text-xl text-indigo-700">{codirector.name||'Codirector'}</h3>
          <p className="text-indigo-700">Co-Director</p>
          <p>Email: {codirector.email||'abc@gmail.com'}</p>
          <p>Phone: {codirector.phone||'0000000000'}</p>
          <a href={codirector.linkedinUrl ? `https://${codirector.linkedinUrl}` : '#'} target="_blank" rel="noopener noreferrer">
          LinkedIn
          </a>
        </div>
      </div>

      {/* Other Team Members */}
      <div className="mb-10">
        <h2 className="text-2xl mb-4">Our Team Members</h2>
        <ul className="flex flex-wrap justify-center list-none">
         { memberList.map((member)=>(
          <li className="m-2 p-3 bg-green-200 rounded-lg shadow-md font-bold text-orange-600">
           <a href={member.linkedinUrl ? `https://${member.linkedinUrl}` : '#'}>{member.name||'member'}</a>
            </li>

         ))}
          
        </ul>
      </div>

      {/* Team Guiding Values */}
      <div className="bg-red-100 p-5 rounded-lg mb-10 text-red-900">
        <h2 className="text-2xl mb-4">Team Guiding Values</h2>
        <p className="text-lg">
          {teamValues[team]||`Our team thrives on innovation, continuously exploring to solve complex challenges.
          Collaboration is at our core, as we harness diverse skills to work efficiently and creatively. We embrace a growth mindset,
          with each member committed to continuous learning and improvement. Integrity and accountability drive our commitment
          to delivering high-quality, reliable solutions. Above all, we are impact-driven, focused on creativity that
          brings meaningful and lasting change, both now and in the future.`}
        </p>
      </div>
    </div>
  );
};

export default TeamsPage;
