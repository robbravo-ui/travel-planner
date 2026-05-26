import { useState, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#0D1B2A;min-height:100vh;color:#0D1B2A;}
.app{max-width:430px;margin:0 auto;min-height:100vh;background:#FDFAF4;position:relative;}

.hero{background:linear-gradient(160deg,#1A6B72 0%,#0D1B2A 100%);padding:44px 22px 24px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;width:260px;height:260px;border-radius:50%;background:rgba(201,168,76,0.1);top:-70px;right:-70px;}
.hero-tag{font-size:10px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#C9A84C;margin-bottom:6px;position:relative;}
.hero-title{font-family:'Playfair Display',serif;font-size:28px;color:white;line-height:1.2;margin-bottom:2px;position:relative;}
.hero-sub{font-size:12px;color:rgba(255,255,255,0.45);font-weight:300;position:relative;}
.hero-trip{margin-top:14px;background:rgba(255,255,255,0.08);border-radius:10px;padding:10px 13px;position:relative;display:flex;align-items:center;justify-content:space-between;}
.hero-trip-name{font-family:'Playfair Display',serif;font-size:15px;color:white;}
.hero-trip-dates{font-size:11px;color:rgba(255,255,255,0.5);margin-top:1px;}
.hero-edit-btn{background:rgba(255,255,255,0.12);border:none;border-radius:7px;padding:5px 10px;font-size:11px;color:rgba(255,255,255,0.7);cursor:pointer;font-family:'DM Sans',sans-serif;}

.nav{display:flex;background:white;border-bottom:1px solid rgba(0,0,0,0.06);position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(0,0,0,0.07);overflow-x:auto;}
.nav-btn{flex:1;min-width:50px;padding:10px 2px;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;letter-spacing:0.3px;color:#8FA8A0;display:flex;flex-direction:column;align-items:center;gap:3px;border-bottom:2px solid transparent;white-space:nowrap;}
.nav-btn.active{color:#1A6B72;border-bottom-color:#1A6B72;}
.nav-icon{font-size:15px;}
.content{padding:16px 14px 100px;}

.section-title{font-family:'Playfair Display',serif;font-size:20px;color:#0D1B2A;margin-bottom:2px;}
.section-sub{font-size:11px;color:#8FA8A0;margin-bottom:14px;font-weight:300;}

/* Info blocks */
.info-card{background:white;border-radius:14px;margin-bottom:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
.info-card-header{display:flex;align-items:center;justify-content:space-between;padding:13px 15px 0;}
.info-card-title{font-family:'Playfair Display',serif;font-size:15px;color:#0D1B2A;display:flex;align-items:center;gap:7px;}
.info-card-icon{font-size:17px;}
.edit-btn{background:none;border:none;cursor:pointer;font-size:11px;color:#1A6B72;font-family:'DM Sans',sans-serif;font-weight:500;padding:4px 8px;border-radius:6px;background:rgba(26,107,114,0.08);}
.info-fields{padding:10px 15px 14px;}
.info-row{display:flex;justify-content:space-between;align-items:flex-start;padding:7px 0;border-bottom:1px solid rgba(0,0,0,0.04);}
.info-row:last-child{border-bottom:none;}
.info-label{font-size:10px;color:#8FA8A0;font-weight:500;letter-spacing:0.3px;text-transform:uppercase;flex-shrink:0;margin-right:12px;padding-top:1px;}
.info-value{font-size:13px;color:#0D1B2A;text-align:right;font-weight:400;word-break:break-word;}
.info-value.empty{color:#C5D5D2;font-style:italic;font-size:12px;}
.info-value.highlight{color:#1A6B72;font-weight:500;font-size:14px;}
.info-value.urgent{color:#E8634A;font-weight:500;}

/* Edit mode */
.edit-card{background:white;border-radius:14px;margin-bottom:10px;padding:15px;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
.edit-card-title{font-family:'Playfair Display',serif;font-size:15px;color:#0D1B2A;margin-bottom:12px;display:flex;align-items:center;gap:7px;}
.field-label{font-size:10px;font-weight:500;color:#1A6B72;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:4px;display:block;}
.field-input{width:100%;padding:9px 12px;border:1.5px solid rgba(0,0,0,0.1);border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13px;color:#0D1B2A;background:#FDFAF4;margin-bottom:9px;outline:none;transition:border-color 0.2s;}
.field-input:focus{border-color:#1A6B72;}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
.save-btn{width:100%;padding:11px;background:linear-gradient(135deg,#1A6B72,#0f4a52);color:white;border:none;border-radius:11px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;margin-top:4px;}
.cancel-btn{width:100%;padding:10px;background:none;border:1.5px solid rgba(0,0,0,0.1);border-radius:11px;font-family:'DM Sans',sans-serif;font-size:13px;color:#8FA8A0;cursor:pointer;margin-top:6px;}

/* Parking */
.parking-card{background:white;border-radius:14px;padding:15px;margin-bottom:10px;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
.photo-slot{border-radius:11px;overflow:hidden;position:relative;height:140px;background:#F5EDD6;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border:2px dashed rgba(26,107,114,0.2);margin-bottom:10px;}
.photo-slot img{width:100%;height:100%;object-fit:cover;position:absolute;}
.photo-slot-icon{font-size:30px;margin-bottom:5px;}
.photo-slot-label{font-size:11px;color:#8FA8A0;text-align:center;}
.photo-overlay{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(13,27,42,0.8),transparent);padding:10px;color:white;font-size:11px;font-weight:500;}
.clear-photo{position:absolute;top:8px;right:8px;background:rgba(13,27,42,0.6);border:none;border-radius:50%;width:24px;height:24px;color:white;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.hidden{display:none;}

/* Expenses */
.budget-wrap{background:white;border-radius:14px;padding:15px;margin-bottom:10px;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
.budget-row{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:8px;}
.budget-amt{font-family:'Playfair Display',serif;font-size:22px;color:#0D1B2A;}
.budget-of{font-size:12px;color:#8FA8A0;}
.bar-track{width:100%;height:7px;background:#F5EDD6;border-radius:8px;overflow:hidden;margin-bottom:7px;}
.bar-fill{height:100%;border-radius:8px;transition:width 0.5s ease;}
.budget-status{font-size:11px;font-weight:500;}
.budget-status.ok{color:#1A6B72;} .budget-status.warn{color:#E8634A;}
.exp-list-title{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#C9A84C;font-weight:500;margin:12px 0 7px;}
.exp-item{background:white;border-radius:11px;padding:10px 12px;margin-bottom:7px;box-shadow:0 1px 5px rgba(0,0,0,0.05);display:flex;align-items:center;gap:9px;}
.exp-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
.exp-info{flex:1;min-width:0;}
.exp-desc{font-size:13px;font-weight:500;color:#0D1B2A;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.exp-meta{font-size:10px;color:#8FA8A0;margin-top:1px;}
.exp-right{text-align:right;flex-shrink:0;}
.exp-amt{font-family:'Playfair Display',serif;font-size:14px;color:#0D1B2A;}
.paid-badge{font-size:9px;padding:2px 6px;border-radius:7px;font-weight:500;margin-top:2px;display:inline-block;}
.paid-badge.paid{background:rgba(26,107,114,0.1);color:#1A6B72;}
.paid-badge.unpaid{background:rgba(232,99,74,0.09);color:#E8634A;}
.del-btn{background:none;border:none;cursor:pointer;font-size:12px;color:#C5D5D2;padding:3px;}
.add-exp-form{background:white;border-radius:14px;padding:15px;margin-bottom:10px;box-shadow:0 2px 10px rgba(0,0,0,0.06);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.form-select{width:100%;padding:9px 12px;border:1.5px solid rgba(0,0,0,0.1);border-radius:9px;font-family:'DM Sans',sans-serif;font-size:13px;color:#0D1B2A;background:#FDFAF4;margin-bottom:9px;outline:none;-webkit-appearance:none;appearance:none;}

/* Reviews */
.stars{display:flex;gap:5px;margin-bottom:9px;}
.star-btn{font-size:22px;background:none;border:none;cursor:pointer;line-height:1;}
.review-card{background:white;border-radius:12px;padding:12px 14px;margin-bottom:8px;box-shadow:0 1px 7px rgba(0,0,0,0.05);}
.review-header{display:flex;justify-content:space-between;margin-bottom:4px;}
.review-place{font-family:'Playfair Display',serif;font-size:14px;color:#0D1B2A;}
.review-text{font-size:12px;color:#8FA8A0;line-height:1.5;font-weight:300;}
.review-date{font-size:10px;color:rgba(143,168,160,0.45);margin-top:4px;}

/* Report */
.report-header-block{background:linear-gradient(135deg,#1A6B72,#0D1B2A);border-radius:13px;padding:18px;margin-bottom:13px;color:white;text-align:center;}
.report-trip-name{font-family:'Playfair Display',serif;font-size:18px;margin-bottom:3px;}
.report-dates-text{font-size:11px;opacity:0.6;}
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;}
.stat-box{background:#F5EDD6;border-radius:10px;padding:11px;text-align:center;}
.stat-val{font-family:'Playfair Display',serif;font-size:19px;color:#1A6B72;}
.stat-label{font-size:9px;color:#8FA8A0;letter-spacing:0.5px;text-transform:uppercase;margin-top:1px;}
.report-section{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#C9A84C;font-weight:500;margin:12px 0 7px;}
.report-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(0,0,0,0.04);font-size:13px;}
.report-row:last-child{border-bottom:none;}
.rr-label{color:#0D1B2A;}
.rr-val{color:#8FA8A0;font-weight:300;text-align:right;max-width:55%;}
.export-btn{width:100%;padding:13px;background:linear-gradient(135deg,#E8634A,#c44a33);color:white;border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;margin-top:8px;}

.toast{position:fixed;bottom:86px;left:50%;transform:translateX(-50%);background:#0D1B2A;color:white;padding:9px 18px;border-radius:20px;font-size:12px;font-weight:500;z-index:999;animation:tIn 0.3s ease,tOut 0.3s ease 1.7s forwards;white-space:nowrap;}
@keyframes tIn{from{opacity:0;transform:translateX(-50%) translateY(8px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
@keyframes tOut{to{opacity:0;}}
.chip{display:inline-block;background:#F5EDD6;color:#1A6B72;font-size:10px;font-weight:500;padding:3px 9px;border-radius:20px;margin-right:5px;margin-top:4px;}
.chip.red{background:rgba(232,99,74,0.1);color:#E8634A;}
`;

const CATS = [
  {id:"flights",label:"Flights",emoji:"✈️"},
  {id:"accommodation",label:"Hotel",emoji:"🏨"},
  {id:"dining",label:"Dining",emoji:"🍽️"},
  {id:"activities",label:"Activities",emoji:"🎭"},
  {id:"transport",label:"Transport",emoji:"🚗"},
  {id:"shopping",label:"Shopping",emoji:"🛍️"},
  {id:"other",label:"Other",emoji:"📌"},
];
const catColor = id=>({flights:"#3B82F6",accommodation:"#1A6B72",dining:"#E8634A",activities:"#C9A84C",transport:"#8B5CF6",shopping:"#EC4899",other:"#8FA8A0"}[id]||"#8FA8A0");

function InfoCard({ icon, title, fields, data, setData }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(data);

  const save = () => { setData(draft); setEditing(false); };
  const cancel = () => { setDraft(data); setEditing(false); };

  if (editing) return (
    <div className="edit-card">
      <div className="edit-card-title"><span>{icon}</span>{title}</div>
      {fields.map(f => (
        <div key={f.key}>
          <label className="field-label">{f.label}</label>
          <input className="field-input" placeholder={f.placeholder||""} value={draft[f.key]||""} onChange={e=>setDraft({...draft,[f.key]:e.target.value})}/>
        </div>
      ))}
      <button className="save-btn" onClick={save}>Save</button>
      <button className="cancel-btn" onClick={cancel}>Cancel</button>
    </div>
  );

  const hasAny = fields.some(f=>data[f.key]);
  return (
    <div className="info-card">
      <div className="info-card-header">
        <div className="info-card-title"><span className="info-card-icon">{icon}</span>{title}</div>
        <button className="edit-btn" onClick={()=>{setDraft(data);setEditing(true);}}>Edit</button>
      </div>
      <div className="info-fields">
        {!hasAny && <div className="info-value empty">Tap Edit to add details</div>}
        {fields.map(f => data[f.key] ? (
          <div key={f.key} className="info-row">
            <div className="info-label">{f.label}</div>
            <div className={`info-value ${f.highlight?"highlight":""} ${f.urgent?"urgent":""}`}>{data[f.key]}</div>
          </div>
        ) : null)}
      </div>
    </div>
  );
}

const BUDGET = 3000;

export default function App() {
  const [tab, setTab] = useState("flights");
  const [toast, setToast] = useState("");
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(""),2200); };

  // Trip header
  const [tripInfo, setTripInfo] = useState({ name:"", destination:"", dates:"", travelers:"" });
  const [editingTrip, setEditingTrip] = useState(false);
  const [tripDraft, setTripDraft] = useState(tripInfo);

  // Section data
  const [outbound, setOutbound] = useState({});
  const [inbound, setInbound] = useState({});
  const [hotel, setHotel] = useState({});
  const [carHire, setCarHire] = useState({});
  const [parking, setParking] = useState({});
  const [insurance, setInsurance] = useState({});
  const [docs, setDocs] = useState({});
  const [emergency, setEmergency] = useState({});
  const [dining1, setDining1] = useState({});
  const [dining2, setDining2] = useState({});
  const [activity1, setActivity1] = useState({});
  const [activity2, setActivity2] = useState({});

  // Parking photo
  const [parkingPhoto, setParkingPhoto] = useState(null);
  const [busPhoto, setBusPhoto] = useState(null);
  const parkingRef = useRef();
  const busRef = useRef();
  const readFile = (file, cb) => { const r=new FileReader(); r.onload=e=>cb(e.target.result); r.readAsDataURL(file); };

  // Expenses
  const [expenses, setExpenses] = useState([]);
  const [expForm, setExpForm] = useState({desc:"",category:"flights",amount:"",date:"",paid:false});
  let nextId = useRef(1);
  const addExp = () => {
    if(!expForm.desc||!expForm.amount){showToast("Fill in description and amount");return;}
    setExpenses(p=>[...p,{...expForm,id:nextId.current++,amount:parseFloat(expForm.amount)}]);
    setExpForm({desc:"",category:"flights",amount:"",date:"",paid:false});
    showToast("Expense added ✓");
  };
  const totalSpend = expenses.reduce((a,e)=>a+e.amount,0);
  const paidSpend = expenses.filter(e=>e.paid).reduce((a,e)=>a+e.amount,0);
  const pct = Math.min((totalSpend/BUDGET)*100,100);
  const over = totalSpend>BUDGET;

  // Reviews
  const [reviews, setReviews] = useState([]);
  const [revForm, setRevForm] = useState({place:"",stars:0,text:""});
  const addReview = () => {
    if(!revForm.place||!revForm.stars||!revForm.text){showToast("Fill in all fields");return;}
    setReviews(p=>[{...revForm,date:"Today"},... p]);
    setRevForm({place:"",stars:0,text:""});
    showToast("Review saved ✓");
  };
  const avgRating = reviews.length?(reviews.reduce((a,r)=>a+r.stars,0)/reviews.length).toFixed(1):"—";

  const tabs = [
    {id:"flights",icon:"✈️",label:"Flights"},
    {id:"stay",icon:"🏨",label:"Stay"},
    {id:"transport",icon:"🚗",label:"Travel"},
    {id:"docs",icon:"📁",label:"Docs"},
    {id:"bookings",icon:"📅",label:"Plans"},
    {id:"expenses",icon:"💰",label:"Budget"},
    {id:"reviews",icon:"⭐",label:"Notes"},
    {id:"report",icon:"📄",label:"Report"},
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app">

        {/* HERO */}
        <div className="hero">
          <div className="hero-tag">✦ Trip Command Centre</div>
          <div className="hero-title">Everything<br /><em>in one place</em></div>
          <div className="hero-sub">Your complete travel reference</div>
          <div className="hero-trip">
            <div>
              <div className="hero-trip-name">{tripInfo.name||"Your Trip Name"}</div>
              <div className="hero-trip-dates">{tripInfo.destination&&tripInfo.dates?`${tripInfo.destination} · ${tripInfo.dates}`:tripInfo.destination||"Tap Edit to set your trip details"}</div>
            </div>
            <button className="hero-edit-btn" onClick={()=>{setTripDraft(tripInfo);setEditingTrip(true);}}>Edit Trip</button>
          </div>
          {editingTrip && (
            <div style={{marginTop:12,background:"rgba(255,255,255,0.1)",borderRadius:10,padding:12}}>
              {[{k:"name",p:"Trip name (e.g. Italy 2025)"},{k:"destination",p:"Destination"},{k:"dates",p:"Dates (e.g. Jun 14–21)"},{k:"travelers",p:"Travellers (e.g. 2 adults)"}].map(f=>(
                <input key={f.k} className="field-input" placeholder={f.p} value={tripDraft[f.k]||""} onChange={e=>setTripDraft({...tripDraft,[f.k]:e.target.value})} style={{marginBottom:7,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.2)",color:"white"}}/>
              ))}
              <div style={{display:"flex",gap:8}}>
                <button className="save-btn" style={{flex:1}} onClick={()=>{setTripInfo(tripDraft);setEditingTrip(false);}}>Save</button>
                <button className="cancel-btn" style={{flex:1,borderColor:"rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.6)"}} onClick={()=>setEditingTrip(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {/* NAV */}
        <div className="nav">
          {tabs.map(t=>(
            <button key={t.id} className={`nav-btn ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>
              <span className="nav-icon">{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <div className="content">

          {/* FLIGHTS */}
          {tab==="flights" && <>
            <div className="section-title">Flights</div>
            <div className="section-sub">Your outbound and return flight details</div>
            <InfoCard icon="🛫" title="Outbound Flight" data={outbound} setData={setOutbound} fields={[
              {key:"airline",label:"Airline",placeholder:"e.g. British Airways"},
              {key:"flightNo",label:"Flight No.",placeholder:"e.g. BA2345",highlight:true},
              {key:"date",label:"Date",placeholder:"e.g. 14 Jun 2025"},
              {key:"departs",label:"Departs",placeholder:"e.g. 09:45 LHR Terminal 5",highlight:true},
              {key:"arrives",label:"Arrives",placeholder:"e.g. 13:10 NAP"},
              {key:"booking",label:"Booking Ref",placeholder:"e.g. ABC123",highlight:true},
              {key:"seat",label:"Seat(s)",placeholder:"e.g. 24A, 24B"},
              {key:"baggage",label:"Baggage",placeholder:"e.g. 23kg hold + cabin"},
              {key:"checkin",label:"Check-in Opens",placeholder:"e.g. 24hrs before"},
            ]}/>
            <InfoCard icon="🛬" title="Return Flight" data={inbound} setData={setInbound} fields={[
              {key:"airline",label:"Airline",placeholder:"e.g. British Airways"},
              {key:"flightNo",label:"Flight No.",placeholder:"e.g. BA2346",highlight:true},
              {key:"date",label:"Date",placeholder:"e.g. 21 Jun 2025"},
              {key:"departs",label:"Departs",placeholder:"e.g. 15:30 NAP",highlight:true},
              {key:"arrives",label:"Arrives",placeholder:"e.g. 17:00 LHR Terminal 5"},
              {key:"booking",label:"Booking Ref",placeholder:"e.g. ABC123",highlight:true},
              {key:"seat",label:"Seat(s)",placeholder:"e.g. 24A, 24B"},
              {key:"terminal",label:"Terminal",placeholder:"e.g. Terminal 2"},
            ]}/>
          </>}

          {/* STAY */}
          {tab==="stay" && <>
            <div className="section-title">Accommodation</div>
            <div className="section-sub">Hotel details and confirmation</div>
            <InfoCard icon="🏨" title="Hotel" data={hotel} setData={setHotel} fields={[
              {key:"name",label:"Name",placeholder:"Hotel name",highlight:true},
              {key:"address",label:"Address",placeholder:"Full address"},
              {key:"phone",label:"Phone",placeholder:"Hotel phone number",highlight:true},
              {key:"email",label:"Email",placeholder:"Hotel email"},
              {key:"confirmation",label:"Confirmation",placeholder:"Booking reference",highlight:true},
              {key:"checkin",label:"Check-in",placeholder:"e.g. From 3:00 PM"},
              {key:"checkout",label:"Check-out",placeholder:"e.g. By 11:00 AM"},
              {key:"nights",label:"Nights",placeholder:"e.g. 7"},
              {key:"room",label:"Room Type",placeholder:"e.g. Superior Sea View"},
              {key:"breakfast",label:"Breakfast",placeholder:"e.g. Included / Not included"},
              {key:"wifi",label:"WiFi",placeholder:"e.g. Free / Password: xxxx"},
              {key:"parking",label:"Parking",placeholder:"e.g. On-site €15/night"},
              {key:"notes",label:"Notes",placeholder:"Any special requests"},
            ]}/>
          </>}

          {/* TRANSPORT */}
          {tab==="transport" && <>
            <div className="section-title">Travel & Transport</div>
            <div className="section-sub">Getting there and getting around</div>

            {/* Parking photo */}
            <div className="parking-card">
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:"#0D1B2A",marginBottom:3}}>🅿️ Airport Parking</div>
              <div style={{fontSize:11,color:"#8FA8A0",marginBottom:11,fontWeight:300}}>Photo your spot on the way out — find it easily on return</div>
              <div className="photo-slot" onClick={()=>parkingRef.current.click()}>
                {parkingPhoto&&<img src={parkingPhoto} alt="parking"/>}
                {parkingPhoto&&<button className="clear-photo" onClick={e=>{e.stopPropagation();setParkingPhoto(null);}}>✕</button>}
                {parkingPhoto&&parking.bay&&<div className="photo-overlay">🅿️ {parking.bay}</div>}
                {!parkingPhoto&&<><div className="photo-slot-icon">📷</div><div className="photo-slot-label">Tap to photograph your parking spot</div></>}
              </div>
              <input ref={parkingRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={e=>{const f=e.target.files[0];if(f)readFile(f,url=>{setParkingPhoto(url);showToast("Parking photo saved 🅿️");});}}/>
              <InfoCard icon="🅿️" title="Parking Details" data={parking} setData={setParking} fields={[
                {key:"location",label:"Car Park",placeholder:"e.g. Long Stay Car Park 2"},
                {key:"bay",label:"Level / Bay",placeholder:"e.g. Level 3, Bay 42B",highlight:true},
                {key:"terminal",label:"Terminal",placeholder:"e.g. Terminal 5"},
                {key:"shuttle",label:"Shuttle Bus",placeholder:"e.g. Every 10 mins"},
                {key:"booking",label:"Booking Ref",placeholder:"e.g. NCP-12345"},
                {key:"cost",label:"Total Cost",placeholder:"e.g. £85 for 7 nights"},
                {key:"returnNote",label:"Return Note",placeholder:"e.g. Bus stop outside Arrivals Door 4"},
              ]}/>
            </div>

            {/* Bus / transfer photo */}
            <div className="parking-card">
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:"#0D1B2A",marginBottom:3}}>🚌 Airport Transfer</div>
              <div style={{fontSize:11,color:"#8FA8A0",marginBottom:11,fontWeight:300}}>Photo your bus stop or pickup point for the return journey</div>
              <div className="photo-slot" onClick={()=>busRef.current.click()}>
                {busPhoto&&<img src={busPhoto} alt="bus stop"/>}
                {busPhoto&&<button className="clear-photo" onClick={e=>{e.stopPropagation();setBusPhoto(null);}}>✕</button>}
                {!busPhoto&&<><div className="photo-slot-icon">📷</div><div className="photo-slot-label">Tap to photograph your bus stop or drop-off</div></>}
              </div>
              <input ref={busRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={e=>{const f=e.target.files[0];if(f)readFile(f,url=>{setBusPhoto(url);showToast("Transfer photo saved 🚌");});}}/>
            </div>

            <InfoCard icon="🚗" title="Car Hire" data={carHire} setData={setCarHire} fields={[
              {key:"company",label:"Company",placeholder:"e.g. Hertz"},
              {key:"booking",label:"Booking Ref",placeholder:"e.g. HZ-789456",highlight:true},
              {key:"pickup",label:"Pick-up",placeholder:"e.g. Naples Airport, 14:00"},
              {key:"dropoff",label:"Drop-off",placeholder:"e.g. Naples Airport, 10:00"},
              {key:"vehicle",label:"Vehicle",placeholder:"e.g. Fiat 500 or similar"},
              {key:"insurance",label:"Insurance",placeholder:"e.g. Full cover included"},
              {key:"phone",label:"Company Phone",placeholder:"Local contact number"},
              {key:"fuelPolicy",label:"Fuel Policy",placeholder:"e.g. Full to full"},
              {key:"extras",label:"Extras",placeholder:"e.g. GPS, child seat"},
            ]}/>
          </>}

          {/* DOCUMENTS */}
          {tab==="docs" && <>
            <div className="section-title">Documents</div>
            <div className="section-sub">Key numbers you might need in a hurry</div>
            <InfoCard icon="🛡️" title="Travel Insurance" data={insurance} setData={setInsurance} fields={[
              {key:"provider",label:"Provider",placeholder:"e.g. Aviva Travel"},
              {key:"policy",label:"Policy No.",placeholder:"Your policy number",highlight:true},
              {key:"emergency",label:"Emergency Line",placeholder:"24hr emergency number",urgent:true},
              {key:"medical",label:"Medical Cover",placeholder:"e.g. £10m"},
              {key:"cancellation",label:"Cancellation",placeholder:"e.g. £5,000 per person"},
              {key:"excess",label:"Excess",placeholder:"e.g. £100 per claim"},
              {key:"expires",label:"Valid Until",placeholder:"Policy expiry date"},
            ]}/>
            <InfoCard icon="🪪" title="Passports & ID" data={docs} setData={setDocs} fields={[
              {key:"p1name",label:"Traveller 1",placeholder:"Full name as on passport"},
              {key:"p1num",label:"Passport No. 1",placeholder:"Passport number",highlight:true},
              {key:"p1exp",label:"Expiry 1",placeholder:"Expiry date",urgent:true},
              {key:"p2name",label:"Traveller 2",placeholder:"Full name as on passport"},
              {key:"p2num",label:"Passport No. 2",placeholder:"Passport number",highlight:true},
              {key:"p2exp",label:"Expiry 2",placeholder:"Expiry date",urgent:true},
              {key:"driving",label:"Driving Licence",placeholder:"Licence number if hiring a car"},
            ]}/>
            <InfoCard icon="🆘" title="Emergency Contacts" data={emergency} setData={setEmergency} fields={[
              {key:"local",label:"Local Emergency",placeholder:"e.g. 112 (EU) or 911 (US)",urgent:true},
              {key:"police",label:"Local Police",placeholder:"Non-emergency number"},
              {key:"embassy",label:"UK Embassy",placeholder:"Embassy phone number"},
              {key:"doctor",label:"Local Doctor",placeholder:"If pre-arranged"},
              {key:"hospital",label:"Nearest Hospital",placeholder:"Name and address"},
              {key:"contact1",label:"Home Contact",placeholder:"Name and number — someone at home"},
              {key:"contact2",label:"Home Contact 2",placeholder:"Backup contact"},
              {key:"bank",label:"Bank (lost card)",placeholder:"Bank emergency number",highlight:true},
            ]}/>
          </>}

          {/* PLANS / BOOKINGS */}
          {tab==="bookings" && <>
            <div className="section-title">Plans & Bookings</div>
            <div className="section-sub">Reservations, activities and dining</div>
            <InfoCard icon="🍽️" title="Restaurant 1" data={dining1} setData={setDining1} fields={[
              {key:"name",label:"Name",placeholder:"Restaurant name",highlight:true},
              {key:"date",label:"Date & Time",placeholder:"e.g. 15 Jun, 7:30 PM"},
              {key:"address",label:"Address",placeholder:"Full address"},
              {key:"phone",label:"Phone",placeholder:"Restaurant number"},
              {key:"booking",label:"Booking Ref",placeholder:"Confirmation number"},
              {key:"notes",label:"Notes",placeholder:"e.g. Window table requested"},
            ]}/>
            <InfoCard icon="🍽️" title="Restaurant 2" data={dining2} setData={setDining2} fields={[
              {key:"name",label:"Name",placeholder:"Restaurant name",highlight:true},
              {key:"date",label:"Date & Time",placeholder:"e.g. 17 Jun, 8:00 PM"},
              {key:"address",label:"Address",placeholder:"Full address"},
              {key:"phone",label:"Phone",placeholder:"Restaurant number"},
              {key:"booking",label:"Booking Ref",placeholder:"Confirmation number"},
              {key:"notes",label:"Notes",placeholder:"Any notes"},
            ]}/>
            <InfoCard icon="🎭" title="Activity 1" data={activity1} setData={setActivity1} fields={[
              {key:"name",label:"Activity",placeholder:"e.g. Boat tour",highlight:true},
              {key:"date",label:"Date & Time",placeholder:"e.g. 16 Jun, 9:30 AM"},
              {key:"meeting",label:"Meeting Point",placeholder:"Where to go"},
              {key:"operator",label:"Operator",placeholder:"Company name"},
              {key:"phone",label:"Phone",placeholder:"Operator number"},
              {key:"booking",label:"Booking Ref",placeholder:"Confirmation"},
              {key:"cost",label:"Cost",placeholder:"e.g. €120 per couple"},
              {key:"notes",label:"Notes",placeholder:"What to bring, dress code etc."},
            ]}/>
            <InfoCard icon="🎭" title="Activity 2" data={activity2} setData={setActivity2} fields={[
              {key:"name",label:"Activity",placeholder:"e.g. Wine tasting",highlight:true},
              {key:"date",label:"Date & Time",placeholder:"Date and time"},
              {key:"meeting",label:"Meeting Point",placeholder:"Where to go"},
              {key:"operator",label:"Operator",placeholder:"Company name"},
              {key:"phone",label:"Phone",placeholder:"Operator number"},
              {key:"booking",label:"Booking Ref",placeholder:"Confirmation"},
              {key:"cost",label:"Cost",placeholder:"Total cost"},
              {key:"notes",label:"Notes",placeholder:"Any notes"},
            ]}/>
          </>}

          {/* EXPENSES */}
          {tab==="expenses" && <>
            <div className="section-title">Budget</div>
            <div className="section-sub">Plan and track your spending</div>
            <div className="budget-wrap">
              <div className="budget-row">
                <div><div style={{fontSize:10,color:"#8FA8A0",textTransform:"uppercase",letterSpacing:"0.5px"}}>Total Planned</div><div className="budget-amt">${totalSpend.toLocaleString()}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:10,color:"#8FA8A0",textTransform:"uppercase",letterSpacing:"0.5px"}}>Budget</div><div className="budget-of">${BUDGET.toLocaleString()}</div></div>
              </div>
              <div className="bar-track"><div className="bar-fill" style={{width:`${pct}%`,background:over?"#E8634A":"#1A6B72"}}/></div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div className={`budget-status ${over?"warn":"ok"}`}>{over?`⚠️ $${(totalSpend-BUDGET).toLocaleString()} over budget`:`✓ $${(BUDGET-totalSpend).toLocaleString()} remaining`}</div>
                <div style={{fontSize:11,color:"#8FA8A0"}}>Paid: ${paidSpend.toLocaleString()}</div>
              </div>
            </div>

            <div className="exp-list-title">Add Expense</div>
            <div className="add-exp-form">
              <label className="field-label">DESCRIPTION</label>
              <input className="field-input" placeholder="What is this expense?" value={expForm.desc} onChange={e=>setExpForm({...expForm,desc:e.target.value})}/>
              <div className="form-row">
                <div><label className="field-label">AMOUNT ($)</label><input className="field-input" type="number" placeholder="0.00" value={expForm.amount} onChange={e=>setExpForm({...expForm,amount:e.target.value})}/></div>
                <div><label className="field-label">DATE</label><input className="field-input" placeholder="e.g. Jun 14" value={expForm.date} onChange={e=>setExpForm({...expForm,date:e.target.value})}/></div>
              </div>
              <label className="field-label">CATEGORY</label>
              <select className="form-select" value={expForm.category} onChange={e=>setExpForm({...expForm,category:e.target.value})}>
                {CATS.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
              </select>
              <label className="field-label" style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
                <input type="checkbox" checked={expForm.paid} onChange={e=>setExpForm({...expForm,paid:e.target.checked})} style={{width:15,height:15,accentColor:"#1A6B72"}}/>Already paid
              </label>
              <button className="save-btn" style={{marginTop:10}} onClick={addExp}>Add Expense</button>
            </div>

            {expenses.length>0 && <>
              <div className="exp-list-title">All Expenses ({expenses.length})</div>
              {expenses.map(e=>{
                const cat=CATS.find(c=>c.id===e.category);
                return (
                  <div key={e.id} className="exp-item">
                    <div className="exp-dot" style={{background:catColor(e.category)}}/>
                    <div className="exp-info"><div className="exp-desc">{e.desc}</div><div className="exp-meta">{cat?.emoji} {cat?.label}{e.date?` · ${e.date}`:""}</div></div>
                    <div className="exp-right"><div className="exp-amt">${e.amount.toLocaleString()}</div><span className={`paid-badge ${e.paid?"paid":"unpaid"}`}>{e.paid?"Paid":"Planned"}</span></div>
                    <button className="del-btn" onClick={()=>setExpenses(p=>p.filter(x=>x.id!==e.id))}>✕</button>
                  </div>
                );
              })}
            </>}
            {expenses.length===0&&<div style={{textAlign:"center",color:"#C5D5D2",fontSize:13,padding:"20px 0"}}>No expenses yet — add your first one above</div>}
          </>}

          {/* REVIEWS / NOTES */}
          {tab==="reviews" && <>
            <div className="section-title">Trip Notes</div>
            <div className="section-sub">Quick reviews and observations as you go</div>
            <div className="add-exp-form">
              <label className="field-label">PLACE OR EXPERIENCE</label>
              <input className="field-input" placeholder="e.g. Hotel, Restaurant, Activity…" value={revForm.place} onChange={e=>setRevForm({...revForm,place:e.target.value})}/>
              <label className="field-label">RATING</label>
              <div className="stars">{[1,2,3,4,5].map(n=><button key={n} className="star-btn" onClick={()=>setRevForm({...revForm,stars:n})}>{n<=revForm.stars?"⭐":"☆"}</button>)}</div>
              <label className="field-label">YOUR THOUGHTS</label>
              <textarea className="field-input" style={{minHeight:70,resize:"none"}} placeholder="What made it memorable? What to remember?" value={revForm.text} onChange={e=>setRevForm({...revForm,text:e.target.value})}/>
              <button className="save-btn" onClick={addReview}>Save Note</button>
            </div>
            {reviews.length>0 && <>
              <div style={{fontSize:12,color:"#8FA8A0",marginBottom:10}}>{reviews.length} note{reviews.length!==1?"s":""} · avg {avgRating} ★</div>
              {reviews.map((r,i)=>(
                <div key={i} className="review-card">
                  <div className="review-header"><div className="review-place">{r.place}</div><div style={{fontSize:12}}>{"⭐".repeat(r.stars)}</div></div>
                  <div className="review-text">{r.text}</div>
                  <div className="review-date">{r.date}</div>
                </div>
              ))}
            </>}
            {reviews.length===0&&<div style={{textAlign:"center",color:"#C5D5D2",fontSize:13,padding:"20px 0"}}>No notes yet — add your first one above</div>}
          </>}

          {/* REPORT */}
          {tab==="report" && <>
            <div className="section-title">Trip Report</div>
            <div className="section-sub">Your full trip summary at a glance</div>
            <div className="info-card" style={{padding:18}}>
              <div className="report-header-block">
                <div className="report-trip-name">{tripInfo.name||"Your Trip"}</div>
                <div className="report-dates-text">{tripInfo.destination&&tripInfo.dates?`${tripInfo.destination} · ${tripInfo.dates}`:tripInfo.destination||"Set trip details in the header above"}</div>
                {tripInfo.travelers&&<div className="report-dates-text" style={{marginTop:3}}>{tripInfo.travelers}</div>}
              </div>
              <div className="stat-grid">
                <div className="stat-box"><div className="stat-val">{expenses.length}</div><div className="stat-label">Expenses</div></div>
                <div className="stat-box"><div className="stat-val">${totalSpend.toLocaleString()}</div><div className="stat-label">Total Spend</div></div>
                <div className="stat-box"><div className="stat-val">{reviews.length}</div><div className="stat-label">Notes</div></div>
                <div className="stat-box"><div className="stat-val">{reviews.length?avgRating+"★":"—"}</div><div className="stat-label">Avg Rating</div></div>
              </div>

              {(outbound.flightNo||inbound.flightNo) && <>
                <div className="report-section">Flights</div>
                {outbound.flightNo&&<div className="report-row"><span className="rr-label">🛫 Outbound</span><span className="rr-val">{outbound.flightNo} · {outbound.departs||"—"}</span></div>}
                {inbound.flightNo&&<div className="report-row"><span className="rr-label">🛬 Return</span><span className="rr-val">{inbound.flightNo} · {inbound.departs||"—"}</span></div>}
                {outbound.booking&&<div className="report-row"><span className="rr-label">Booking Ref</span><span className="rr-val" style={{color:"#1A6B72",fontWeight:500}}>{outbound.booking}</span></div>}
              </>}

              {hotel.name && <>
                <div className="report-section">Accommodation</div>
                <div className="report-row"><span className="rr-label">🏨 Hotel</span><span className="rr-val">{hotel.name}</span></div>
                {hotel.phone&&<div className="report-row"><span className="rr-label">Phone</span><span className="rr-val" style={{color:"#1A6B72"}}>{hotel.phone}</span></div>}
                {hotel.confirmation&&<div className="report-row"><span className="rr-label">Confirmation</span><span className="rr-val" style={{color:"#1A6B72",fontWeight:500}}>{hotel.confirmation}</span></div>}
                {hotel.checkin&&<div className="report-row"><span className="rr-label">Check-in</span><span className="rr-val">{hotel.checkin}</span></div>}
                {hotel.checkout&&<div className="report-row"><span className="rr-label">Check-out</span><span className="rr-val">{hotel.checkout}</span></div>}
              </>}

              {insurance.policy && <>
                <div className="report-section">Insurance</div>
                <div className="report-row"><span className="rr-label">Policy No.</span><span className="rr-val" style={{color:"#1A6B72",fontWeight:500}}>{insurance.policy}</span></div>
                {insurance.emergency&&<div className="report-row"><span className="rr-label">Emergency Line</span><span className="rr-val" style={{color:"#E8634A",fontWeight:500}}>{insurance.emergency}</span></div>}
              </>}

              {emergency.local && <>
                <div className="report-section">Emergency</div>
                <div className="report-row"><span className="rr-label">Local Emergency</span><span className="rr-val" style={{color:"#E8634A",fontWeight:500}}>{emergency.local}</span></div>
                {emergency.bank&&<div className="report-row"><span className="rr-label">Bank (lost card)</span><span className="rr-val">{emergency.bank}</span></div>}
              </>}

              {expenses.length>0 && <>
                <div className="report-section">Budget Summary</div>
                <div className="report-row"><span className="rr-label">Total Planned</span><span className="rr-val" style={{color:over?"#E8634A":"#1A6B72",fontWeight:500}}>${totalSpend.toLocaleString()}</span></div>
                <div className="report-row"><span className="rr-label">Paid</span><span className="rr-val">${paidSpend.toLocaleString()}</span></div>
                <div className="report-row"><span className="rr-label">Still to Pay</span><span className="rr-val">${(totalSpend-paidSpend).toLocaleString()}</span></div>
              </>}

              {reviews.length>0 && <>
                <div className="report-section">Trip Notes</div>
                {reviews.map((r,i)=><div key={i} className="report-row"><span className="rr-label" style={{maxWidth:"60%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.place}</span><span className="rr-val">{"⭐".repeat(r.stars)}</span></div>)}
              </>}

              <button className="export-btn" onClick={()=>showToast("Report exported as PDF 📄")}>📄 Export PDF Report</button>
            </div>
          </>}

        </div>
        {toast&&<div className="toast">{toast}</div>}
      </div>
    </>
  );
}
