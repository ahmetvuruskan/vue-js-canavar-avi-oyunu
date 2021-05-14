new Vue({
	el: "#app",
	data:{
		playerHeal: 100,
		monsterHeal: 100,
		gameIsOn : false,
		logs :[]
	},
	methods:{
		startGame: function(){
			this.gameIsOn=true
		},
		attack: function(){
			this.monsterHeal-=Math.ceil(Math.random()*10);
			this.addToLog({turn:"p",text:"Oyuncu Atağı"})
			this.monsterAttack();
		},
		specialAttack:function(){
			this.monsterHeal-=Math.ceil(Math.random()*25);
			this.addToLog({turn:"p",text:" Özel Oyuncu Atağı"});
			this.monsterAttack();
		},
		healUp:function(){
			this.playerHeal+=Math.ceil(Math.random()*20);
			this.addToLog({turn:"p",text:"İlkyardım"});
			this.monsterAttack();
		},
		giveUp(){
			this.playerHeal=0;
			this.addToLog({turn:"p",text:"Oyunu pes etti"});
		},
		monsterAttack(){
			this.playerHeal-=Math.ceil(Math.random()*15);
			this.addToLog({turn:"c",text:"Canavar Hasarı"});
		},
		addToLog:function(log){
			console.log(log)
			this.logs.push(log);
		}
	},
	watch:{
		playerHeal:function(value){
			if (value<=0) {
				this.playerHeal=0;
				if (confirm("Oyunu Kaybettin. Tekrar denemek ister misin")) {
					this.monsterHeal = this.playerHeal = 100;
					this.logs = [];
				}else{
					this.gameIsOn = false
					this.monsterHeal = this.playerHeal = 100;
					this.logs = [];
				}
			}else if(value>=100){
				this.playerHeal=100;
			}
		},
		monsterHeal:function(value){
			if (value<=0) {
				if (confirm("Oyunu Kazandın. Tekrar denemek ister misin")) {
					this.monsterHeal = this.playerHeal = 100;
					this.logs = [];
				}else{
					this.gameIsOn = false
					this.monsterHeal = this.playerHeal = 100;
					this.logs = [];
				}
				this.monsterHeal=0;
			}else if(value>=100){
				this.monsterHeal=100;
			}
		}

	}
})