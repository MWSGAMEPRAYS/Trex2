var JOGAR = 1;

var ENCERRAR = 0;

var estadojogo = JOGAR;

var trex, trex_correndo, trex_colide, bordas;

var solo,solo_invisivel,imagemdosolo; 

var obstaculo1,obstaculo2,obstaculo3,obstaculo4,obstaculo5,obstaculo6,grupodeobstaculos;

var nuvem,imagemnuvem,grupodenuvens;

var pontuacao = 0;

var fim_de_jogo, fim_de_jogo_img;

var reiniciar, reiniciar_img;

var som_pular, som_morrer, som_score;

function preload(){
  
  obstaculo1 = loadImage("obstacle1.png");
  
  obstaculo2 = loadImage("obstacle2.png");
  
  obstaculo3 = loadImage("obstacle3.png");
  
  obstaculo4 = loadImage("obstacle4.png");
  
  obstaculo5 = loadImage("obstacle5.png");
  
  obstaculo6 = loadImage("obstacle6.png");
  
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  imagemdosolo = loadImage("ground2.png");
  
  imagemnuvem= loadImage("cloud.png");
  
  trex_colide = loadAnimation("trex_collided.png");

  fim_de_jogo_img = loadImage("gameOver.png");

  reiniciar_img = loadImage("restart.png");

  som_pular = loadSound("jump.mp3");
  
  som_morrer =  loadSound("die.mp3");
  
  som_score = loadSound("checkPoint.mp3");

}

function setup(){
  createCanvas(600,200);
 
  //solo ivisivel é para ele não ficar flutuando.
 
  solo_invisivel = createSprite(200,190,400,10);
  
  solo_invisivel.visible=false;
  
  //fim de jogo
  
  fim_de_jogo = createSprite(300,100);
  
  fim_de_jogo.addImage("gameOver", fim_de_jogo_img);
  fim_de_jogo.scale = 0.5;
 
  
  reiniciar = createSprite(300,150);
  
  reiniciar.addImage("restart", reiniciar_img);
  
  reiniciar.scale = 0.5;
  // criando o trex 
  
  trex = createSprite(50,160,20,50);
  
  trex.addAnimation("running", trex_correndo);
  
  trex.addAnimation("stop", trex_colide);
  
  bordas = createEdgeSprites();
  
  //criando sprite solo
  
  solo = createSprite(200,180,400,20);
  
  solo.addImage("solo", imagemdosolo);
  
  // adicionando escala e posição ao trex
  
  trex.scale = 0.5;
  
  trex.x = 50;

  /*grupodeobstaculos = new Group(); serve para criar um grupo de obstaculos para que todos eles façam a mesma coisa, o mesmo acontece com as nuvens.*/
  
  grupodeobstaculos = new Group();
  
  grupodenuvens = new Group();

  trex.setCollider("circle", 0,0,35); 
  


   //trex.debug = true;
  
}


function draw(){
  // definir cor de fundo
  
  background(180);
  
     
  text ("pontuacao: " + pontuacao, 500,45 );
  
  
  if(estadojogo === JOGAR){                
     
    
    // serve para fazer com que suma o fim de jogo.
    fim_de_jogo.visible = false;
      
    reiniciar.visible = false;
    
    
    //pontuacao = pontuacao + Math.round(frameCount/60); está contando a pontuação pelas nuvens.
    
    pontuacao = pontuacao + Math.round(frameRate()/60);
    
    if(pontuacao > 0 && pontuacao%200===0){
      
    som_score.play();
}
    
    //solo.velocityX=-2 é para dar velocidade ao chão
    
    solo.velocityX = -(6+pontuacao/100);
  
    //if(solo.x < 0){ reseta o solo.
  
    if(solo.x < 0){
    solo.x = 200;
}
    
  // o trex pula quando a tecla espaço é acionada 
 
    if(keyDown("space")&& trex.y >= 150){
    
      som_pular.play();
      
      trex.velocityY = -10;
} 
    
    //adicionando gravidade ao trex
  
    trex.velocityY = trex.velocityY + 0.5;
  
    gerarnuvem();
  
    obstaculos();
  
  
//if(grupodeobstaculos).isTouching(trex){ faz com que o obstaculo/ trex ao se colidirem o jogo acabar.    
  if (grupodeobstaculos.isTouching(trex)){
   
    som_morrer.play();
    
    estadojogo = ENCERRAR

    // IA trex.velocityY = -12;
    
   
  
}  
}
  
  else if(estadojogo === ENCERRAR){
    solo.velocityX = 0;

    trex.velocityY = 0;

    grupodeobstaculos.setVelocityXEach(0);
  
    grupodenuvens.setVelocityXEach(0);

    trex.changeAnimation("stop", trex_colide);  

    grupodenuvens.setLifetimeEach(-1);
    
    grupodeobstaculos.setLifetimeEach(-1);  

    fim_de_jogo.visible = true;
    
    reiniciar.visible = true;
  
    if(mousePressedOver(reiniciar)){
    
      reset();    
      
      
      
      
}
  
  
  
  
  
}
    
 
  
  // registrando a posição y do trex
  
  
    

 

  
  
  
  
  // impedir o trex de passar a borda inferior
  
  trex.collide(solo_invisivel);
  
  console.log(frameCount);
  

  
  
  
  drawSprites();
} 

function reset(){
  estadojogo = JOGAR;
  
  reiniciar.visible = false;
  
  fim_de_jogo.visible = false;
  
  grupodenuvens.destroyEach();
  
  grupodeobstaculos.destroyEach();
  
  trex.changeAnimation("running", trex_correndo);  

  pontuacao = 0;
  
  
}


function obstaculos(){
  if  (frameCount%120===0){
  
      var obstaculos = createSprite(600,170,10,25); 
  
      obstaculos.velocityX = -(6+pontuacao/100);  
    
      var numero = Math.round(random(1,6));
      
      switch(numero){
        
      case 1: obstaculos.addImage(obstaculo1);
      
      break;
      
      case 2: obstaculos.addImage(obstaculo2);
      
      break;
      
      case 3: obstaculos.addImage(obstaculo3);
      
      break;
      
      case 4: obstaculos.addImage(obstaculo4);
          
      break;    
      
      case 5: obstaculos.addImage(obstaculo5);
      
      break;
      
      case 6: obstaculos.addImage(obstaculo6);
          
      break;
      
      default: break;

}
   
    obstaculos.scale = 0.5;
    
    
    obstaculos.lifetime= 300;

    grupodeobstaculos.add(obstaculos);
    
  
}    
}    
function gerarnuvem(){

  // frameCount é para contar os frames/ quadros/ fps do jogo.  
  
  if (frameCount%60===0){
    nuvem = createSprite(600,100,40,20);
    nuvem.addImage("nuvem", imagemnuvem);
    
    //nuvem.velocityX = -5 é para o item ter velocidade da direita para a esquerda
    
    nuvem.velocityX = -5;
    nuvem.scale = 0.7

    //Math.round(random(); é para arredondar o numero por inteiro. 
    
    //random é para escolher um numero aleatorio.
    
    nuvem.y = Math.round(random(25,85));
    //console.log(trex.depth);
    //console.log(nuvem.depth);
    
    //depth serve para alterar a profundidade.
    
    trex.depth = nuvem.depth;
    trex.depth = trex.depth + 1;

    
    nuvem.lifetime = 120;
    
    grupodenuvens.add(nuvem);
    
    
}
}  