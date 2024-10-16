import {useEffect,useState} from "react";
import supabase from './supabase'
import './style.css';

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];



function App() {

  const [showForm, setShowForm]=useState(false);
  const [facts, setFacts]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [currentCategory, setCurrentCategory]=useState("all");

  useEffect(function() {
    async function getFacts(){
      setIsLoading(true);

      let query =supabase.from('fact').select('*');
      if(currentCategory!=="all")
        query=query.eq("category",currentCategory);
      const { data: fact, error } = await query
      .order('votesInteresting',{ascending:false}).limit(1000);
      
      

      
      if(!error)setFacts(facts);
      else alert('There was a problem getting data');
      setIsLoading(false);
    }
    getFacts();
    

  },[currentCategory]);

  
  return(
    <>
    <Header showForm={showForm} setShowForm={setShowForm}/>
    
  
    {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm}/> : null }

    <NewFactForm/>
    <main className="main">
    <CategoryFilter setCurrentCategory={setCurrentCategory}/>
    {isLoading ? <Loader/> : <FactList facts={facts} setFacts={setFacts}/>}
    
    
    </main>
    
    </>
  );
}

function Loader(){
  return <p className="message">Loading...</p>;
}




function Header({showForm,setShowForm}){
  const appTitle="Today I Learned";
  return(
    <header className="header">
            <div className="logo">
            <img src="pngwing.com.png" height="68" width="68" alt="msg_logo"/>
            <h1>{appTitle}</h1>
            </div>
        
            <button className="btn btn-large btn-open" onClick={()=>setShowForm((show)=>!show)}>{showForm ? 'Close': "Share a Fact"}</button>
    </header>
  );
}

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function isValidHttpUrl(string){
  let url;
  try{
    url=new URL(string);
  }catch(_){
    return false;
  }
  return url.protocol=="http:" || url.protocol=="https:";
};

function NewFactForm({setFacts,setShowForm}){
  const [text, setText]=useState("");
  const [source,setSource]=useState("");
  const [category,setCategory]=useState("");
  const [isUploading,setIsUploading]=useState(false);
  const textLength=text.length;
  
  
  async function handleSubmit(e){
    //1.prevent browser  reload
    e.preventDefault();

    //2.check data is valid
    if(text && isValidHttpUrl(source) && category && textLength<=200) {
      // const newFact={
      //   id:Math.round(Math.random()*10000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };
      //check if 

      setIsUploading(true);
      const {data:newFact, error}=await supabase.from("facts").insert([{text,source,category}]).select();
      setIsUploading(false);
      
      if(!error) setFacts((facts)=>[newFact[0],...facts]);
      
      setText('');
      setSource('');
      setCategory('');

      setShowForm(false);

    }

    //3.create new fact 

    //4.add new fact 
    
    //5.reset input fields 

    //6.close form 
    
    
  }
  return 
  (<form className="fact-form" onSubmit={handleSubmit}>
  <input type="text" placeholder="Share a fact with world..." value={text} onChange={(e)=>setText(e.target.value)} disabled={isUploading}/>
  <span>200-textLength</span>
  <input value={source} type="text" placeholder="Trustworthy source" onChange={(e)=>setSource(e.target.value)} disabled={isUploading}/>
  <select value={category} onChange={(e)=>setCategory(e.target.value)} disabled={isUploading}>
      <option value="">Choose Category</option>
      {CATEGORIES.map((cat)=> (<option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>))}
  </select>
  <button className="btn btn-large" disabled={isUploading}>Post</button>);
};



function CategoryFilter({setCurrentCategory}) {
  return(
  <aside>
    <ul>
     <li className="category">
      <button className="btn btn-all-categories" onClick={()=>setCurrentCategory("all")}>ALL</button>
      </li>
    {CATEGORIES.map((cat)=>(<li key={cat.name} className="category">
    <button className="btn btn-category" style={{backgroundColor: cat.color }} onClick={()=>setCurrentCategory(cat.name)}>{cat.name} </button>
    </li>))}
    </ul>
  </aside>
); 
};

function FactList({facts,setFacts}){
  if (fact.length ===0)
    return (<p className="message">No facts for this category yet! create the first one✌🏿</p>);
  
  return (
  <section>
    <ul className="facts-list">
      {facts.map((fact)=>(<Fact key={fact.id} fact={fact} setFacts={setFacts}/>))}
    </ul>
    <p>There are {facts.length} facts in the database. Add your own!</p>
  </section>
);
};



function Fact({fact,setFacts}){
  const [isUpdating,setIsUpdating]=useState(false)

  async function handleVotes(columnName){
    setIsUpdating(true);
    const{data:updatedFact,error}=await supabase.from('fact').update({[columnName]:fact[columnName]+1}).eq("id",fact.id).select();
    setIsUpdating(false);
    if(!error) setFacts((facts)=>facts.map((f)=>f.id===fact.id ?updatedFact[0]: f))
  }

  return(
  <li  className="fact">
  <p>{fact.text} <a className="source" href={fact.source} target="_blank">(Source)</a></p>
  <span className="tag" style={{backgroundColor:CATEGORIES.find((cat) => cat.name === fact.category).color, }}>{fact.category}</span>
  
  <div className="vote-buttons">
      <button onClick={()=>handleVotes("votesInteresting")} disabled={isUpdating}>👍 {fact.votesInteresting}</button>
      <button onClick={()=>handleVotes("votesMindblowing")} disabled={isUpdating}>🤯 {fact.votesMindblowing}</button>
      <button onClick={()=>handleVotes("votesFalse")} disabled={isUpdating}>👎 {fact.votesFalse}</button> 
  </div>
  </li>) 
}



export default App;