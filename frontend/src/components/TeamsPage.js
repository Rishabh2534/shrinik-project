import React,{useEffect,useState} from 'react';

const TeamsPage = ({team}) => {
  console.log(team);
  const teamValues={
    Tech:`Our technical team thrives on innovation, continuously exploring emerging technologies to solve complex challenges.
          Collaboration is at our core, as we harness diverse skills to work efficiently and creatively. We embrace a growth mindset,
          with each member committed to continuous learning and improvement. Integrity and accountability drive our commitment
          to delivering high-quality, reliable solutions. Above all, we are impact-driven, focused on creating technology that
          brings meaningful and lasting change, both now and in the future.`,
    Design:"",
    Photography:"",
    Media:"",
    Marketing:"",
    Management:"",
    Editorial:"",

  }
  const [pic1,setPic1]=useState('');
  const [pic2,setPic2]=useState('');
  const [director,setDirector]=useState({
    name:'',
    email:'',
    phone:'',
    linked:''
  });
  const [codirector,setCodirector]=useState({
    name:'',
    email:'',
    phone:'',
    linked:''

  })
  const [memberList,setMemberList]=useState([]);
  useEffect(()=>{
    const fetchpics= async()=>{
      try{  
        const res = await fetch('http://localhost:3000/api/getGallary');
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
        const res=await fetch(`http://localhost:3000/api/getDirector/${team}`);//passteam ame to identify team
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
          const res=await fetch(`http://localhost:3000/api/getMembers/${team}`);//passteam name
          const data=await res.json();
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
      <h1 className="text-4xl mb-8">Meet Our Technical Team</h1>

      <div className="flex justify-center gap-10 mb-10">
        {/* Director Card */}
        <div className="border-2 border-yellow-400 rounded-lg p-5 w-64 shadow-lg bg-white bg-opacity-90 transform transition duration-300 hover:scale-105 text-blue-400">
          <img src={pic1 || "/images/directorDefault.webp"}  className="w-60 h-60 rounded-full object-cover   mx-auto" />
          <h3 className="text-xl text-indigo-700">{director.name||'Director name'}</h3>
          <p className="text-indigo-700">Team Director</p>
          <p>Email: {director.email||'abc@gmail.com'}</p>
          <p>Phone: {director.phone||'0000000000'}</p>
          <a href={director.linked || '#'} target="_blank" rel="noopener noreferrer">
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
          <a href={codirector.linked || '#'} target="_blank" rel="noopener noreferrer">
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
           <a href={member.linkedinUrl||'#'}>{member.name||'member'}</a>
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
