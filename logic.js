let xMixto;
let aMixto;
let cMixto;
let mMixto;


let xMulti;
let aMulti;
let mMulti;


/* Tablas estadisticas de las 3 distribuciones a tener en cuenta */

/* NOTA: Dado que la significancia o alfa seria de 5% las tablas aqui escritas solo tendran valores 
relacionados con esta. */

//Distribución z

const estZ= 1.96;

//Distribución Chi cuadrado para alfa de 0.05

const chiCuadrado= [
    [1,3.84],
    [2,5.99],
    [3,7.81],
    [4,9.49],
    [5,11.07],
    [6,12.59],
    [7,14.07],
    [8,15.51],
    [9,16.92],
    [10,18.31],
    [11,19.68],
    [12,21.0],
    [13,22.4],
    [14,23.7],
    [15,25.0],
    [16,26.3],
    [17,27.6],
    [18,28.9],
    [19,30.1],
    [20,31.4],
    [21,32.7],
    [22,33.9],
    [23,35.2],
    [24,36.4],
    [25,37.7],
    [26,38.9],
    [27,40.1],
    [28,41.3],
    [29,42.6],
    [30,43.8],
    [40,55.8],
    [50,67.5],
    [60,79.1],
    [70,90.5],
    [80,101.9],
    [90,113.1],
    [100,124.3],
];

//Distribución de kolmogorov-smirnov para el 5% de significancia

const kolmogorovSmirnov=[
    [1,0.975],
    [2,0.842],
    [3,0.708],
    [4,0.624],
    [5,0.563],
    [6,0.521],
    [7,0.486],
    [8,0.457],
    [9,0.432],
    [10,0.409],
    [11,0.391],
    [12,0.375],
    [13,0.361],
    [14,0.349],
    [15,0.338],
    [16,0.328],
    [17,0.318],
    [18,0.309],
    [19,0.301],
    [20,0.294],
    [25,0.264],
    [30,0.242],
    [35,0.230],
    [40,0.210],
    [50,0.188],
    [60,0.172],
    [70,0.160],
    [80,0.150],
    [90,0.141],
    [100,0.134]
];


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* lectura de parametros */

/* console.log(generadorDeNumAlMixto(5,7,13,101));
console.log(generadorDeNumAlMulti(3,5,157)); */

/* console.log(verificadorParametrosMixto(5,7,13,101)); */



/* console.log(verificarParametrosMulti(3,5,157));

console.log(generarNumAleatorios(1,7,7,13,173));
console.log(generarNumAleatorios(2,3,5,0,157)); */

console.log(pFrecuencias(generarNumAleatorios(2,3,5,0,157)));
console.log(pPromedios(generarNumAleatorios(2,3,5,0,157)));
console.log(pKolmogorovSmirnov(generarNumAleatorios(2,3,5,0,157)));
console.log(pDistancias(generarNumAleatorios(2,3,5,0,157)));
console.log(pCorridas(generarNumAleatorios(2,3,5,0,157)));

/* **** ----Funciones para generar los numero alea,torios----****** */


//Funcion del metodo congruencial mixto
function mCongruMixto(xMixto, aMixto, cMixto, mMixto){
    let num1=[], numAlEn=[], numAl=[];

    for(let x=0; x<mMixto-1; x++){
        if(x ==0){
            num1[x] = aMixto * xMixto + cMixto;
        }else{
            num1[x] = aMixto * numAlEn[x-1] + cMixto;
        }
        numAlEn[x] = num1[x]%mMixto;
        numAl[x]=numAlEn[x]/mMixto;
    }

    return numAl;
}

//Función del metodo congruencual multilplicativo
function mCongruMultiplicativo(xMulti, aMulti, mMulti){
    let num1=[], numAlEn=[], numAl=[];

    for(let x=0; x<mMulti/4; x++){
        if(x==0){
            num1[x]= aMulti * xMulti;
        }else{
            num1[x]= aMulti * numAlEn[x-1];
        }
        numAlEn[x] = num1[x]%mMulti;
        numAl[x]=numAlEn[x]/mMulti;
    }

    return numAl;

}

//funcion de control para generarl los numeros, realizar la validación y dependiendo del metodo seleccionado ejecutar este.
function generarNumAleatorios(metodoGen, x, a, cMixto, m ){
    if(metodoGen==1){
        if(verificarParametrosMixto(x,a,cMixto,m)){
            return mCongruMixto(x, a, cMixto, m);
        }
        else{
            return 0;
        }
    }else{
        if(verificarParametrosMulti(x,a,m)){
            return mCongruMultiplicativo(x,a,m);
        }else{
            return 0
        }
        
    }
}

//Función de validación de los parametros para el metodo congruencial mixto
function verificarParametrosMixto(x,a,c,m){
    let primo=true, entero, impar, noDivisible, resultado=false;

    if(x>0 && a>0 && c>0 && m>x && m>a && m>c && c!=1){
        for (var i = 2; i < m; i++) {
            if (m%i==0){
                primo=false;
                break;
            }

        }

        if(a%1 == 0 && c%1 ==0 && a%2!=0 && c%2!=0){
            entero=true;
            impar=true;
            if(a%3!=0 || a%5!=0){
                noDivisible=true;
            }else{
                noDivisible=false;
            }
        }else{
            entero = false;
            impar=false;
        }
        

        if(primo && entero && impar && noDivisible){
            resultado=true;
        }else{
            resultado=false;
        }
        
    }else{
        return resultado;
    }

    return resultado;
}

//Función de validación de los parametros para el metodo congruencial multiplicativo. 
function verificarParametrosMulti(x,a,m){
    let primo=true, entero, impar ,rPrimM, tEnt, resultado=false;

    for (var i = 2; i < m; i++) {
        if (m%i==0){
            primo=false;
            break;
        }
    }

    if(x%1==0 && x%2!=0 && m%x!=0 ){
        entero=true;
        impar=true;
        rPrimM=true;
    }else{
        entero=false;
        impar=false;
        rPrimM=false;
    }

    if( ((a-3)/8)%1 == 0 || ((a+3)/8)%1 == 0  ){
        tEnt = true;
    }else{
        tEnt = false;
    }

    if(primo && entero && impar &&rPrimM &&tEnt){
        resultado = true;
    }else{
        resultado = false;
    }

    return resultado;

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////



/* ********------ Funciones para las pruebas estadisticas------******** */

//Función para prueba de promedios
function pPromedios(numAleatorios=[]){
    let prom, Zo, absZo, sumatoria = 0;

    for(let x=0; x<numAleatorios.length; x++){
        sumatoria = sumatoria + numAleatorios[x];
    }

    prom = sumatoria/numAleatorios.length;
    Zo = ((prom - 0.5)*(Math.sqrt(numAleatorios.length))) / Math.sqrt(1/12);
    absZo = Math.abs(Zo) ;

    if(absZo<estZ){
        return true;
    }else{
        return false;
    }
}

//Función para prueba de frecuencias
function pFrecuencias(numAleatorios=[]){

    /* intervalor: [0 --- > 0 - 0.2] 
                   [1 --- > 0.2 - 0.4]
                   [2 --- > 0.4 -0.6]
                   [3 --- > 0.6 - 0.8]
                   [4 --- > 0.8 - 1]
                   
                   Los grados de libertad son 4 ya que tenemos 5 intervalos*/

    let fe=numAleatorios.length/5, fo=[0,0,0,0,0], frecOper, Xo=0, X, libertad = 4;

    for(let x=0; x<numAleatorios.length; x++){
        if(numAleatorios[x] >= 0 && numAleatorios[x]< 0.2 ){
            fo[0]= fo[0]+1;
        }else if(numAleatorios[x] >= 0.2 && numAleatorios[x] <0.4){
            fo[1]= fo[1]+1;
        }else if(numAleatorios[x] >= 0.4 && numAleatorios[x] <0.6){
            fo[2]= fo[2]+1;
        }else if(numAleatorios[x] >= 0.6 && numAleatorios[x] <0.8){
            fo[3]= fo[3]+1;
        }else if(numAleatorios[x] >= 0.8 && numAleatorios[x] <1){
            fo[4]= fo[4]+1;
        }
    }

    for(let x=0; x<fo.length; x++){
        frecOper = (Math.pow((fo[x] - fe),2)) / fe;
        Xo = Xo + frecOper;
    }

    for(let x=0; x<chiCuadrado.length; x++){
        
        if(chiCuadrado[x][0] == libertad){
            X = chiCuadrado[x][1];
            if(Xo<X){
                return true;
            }else{
                return false;
            }
        }
        
    }

}

//Función para prueba de Kolmogorov-Smirnov
function pKolmogorovSmirnov(numAleatorios=[]){
    let Fn=[], DnOper=[], Dn, d;

    numAleatorios.sort(function(a, b){return a - b});
    /* console.log(numAleatorios); */
    let numAl = [];
    for (let i=0; i<numAleatorios.length; i++){
        numAl.push(parseFloat(numAleatorios[i]))
    }

    for(let x=0; x<numAl.length; x++){
        Fn[x]=(x+1) / numAl.length;
        DnOper[x]= Math.abs((Fn[x]-numAl[x]));
    }

    Dn = Math.max.apply(null,DnOper);

    for(let x=0; x < kolmogorovSmirnov.length; x++ ){
        if(kolmogorovSmirnov[x][0]==numAleatorios.length){
            d=kolmogorovSmirnov[x][1];
            if(Dn<d){
                return true;
            }else{
                return false;
            }
        }else if(x == kolmogorovSmirnov.length-1){
            d=1.36/(Math.sqrt(numAleatorios.length));
            if(Dn<d){
                return true;
            }else{
                return false;
            }
        }

    }

 


}

//Función para prueba de distancias (cosiderados los numeros Pseudo aleatorio como reales ). 
function pDistancias(numAleatorios=[]){

    /* α = 0.3 y β = 0.5 , los grados de libertad es la cantidad de intervalos y esta caso seran 5 por lo que 
    lor grados de libertad son 5*/

    let s=[], numHuecos=[], cont=0, cont2=0, fe=[], fo=[0,0,0,0,0,0], h=0, Xy=[], Xo2=0, libertad=5, xEsta;

    for(let x=0; x<numAleatorios.length; x++){
        if(numAleatorios[x]>=0.3 && numAleatorios[x]<=0.5){
            s[x]=1;
        }else{
            s[x]=0;
        }
    }

    for(let x=0; x<s.length; x++){

        if(s[x]==0){
            cont=cont + 1;
            if(s[x+1]==1 || x == s.length-1){
                numHuecos[cont2]=cont;
                cont2=cont2+1;
                cont=0;
            }
        }else{
            if(s[x+1]==1){
                numHuecos[cont2]=0;
                cont2=cont2+1;
            }
        }

    }

    for(let x=0; x<numHuecos.length; x++){
        if(numHuecos[x]==0){
            fo[0]=fo[0]+1;
        }else if(numHuecos[x]==1){
            fo[1]=fo[1]+1;
        }else if(numHuecos[x]==2){
            fo[2]=fo[2]+1;
        }else if(numHuecos[x]==3){
            fo[3] = fo[3]+1;
        }else if(numHuecos[x]==4){
            fo[4] = fo[4]+1;
        }else if(numHuecos[x]>=5){
            fo[5] = fo[5]+1;
        }
    }


    for(let x=0; x<fo.length; x++){
        h= h + fo[x];
    }
    

    for(let x=0; x<6; x++){
        if(x==5){
            fe[x]=(h)*Math.pow((1-(0.5-0.3)),x)
        }else{
            fe[x]=(h)*(0.5-0.3)* Math.pow((1-(0.5-0.3)),x)
        }   
    }


    for(let x=0; x<fe.length; x++){
        Xy[x]= (Math.pow((fo[x]-fe[x]),2)) /fe[x];
        Xo2 = Xo2 + Xy[x];
    }

    console.log(Xo2);
    console.log(numHuecos);
    console.log(fo);
    console.log(fe);

    for(let x=0; x<chiCuadrado.length; x++){
        
        if(chiCuadrado[x][0] == libertad){
             xEsta= chiCuadrado[x][1];
            if(Xo2<xEsta){
                return true;
            }else{
                return false;
            }
        }
        
    }

}

//Función para prueba de corridas (corridas hacia bajo y hacia arriba del promedio)
function pCorridas(numAleatorios=[]){
    let s=[], logCorridas=[], cont=0, cont2=0, fo=[0,0,0,0,0,0,0], fe=[], Xo=[], Xo2=0, libertad=7, xEsta;

    for(let x=0; x<numAleatorios.length; x++){
        if(numAleatorios[x]<0.5){
            s[x]=0;
        }else[
            s[x]=1,
        ]
    }

    for(let x=0; x<s.length; x++){
        if(s[x]==0){            
            cont = cont+1;
            if(s[x+1] == 1 || x==s.length-1){
                logCorridas.push(cont);
                cont = 0;
            }
            
        }else{
            cont2 = cont2 +1;
            if(s[x+1] == 0 || x==s.length-1){
                logCorridas.push(cont2);
                cont2 = 0;
            }
        }
        
    }


    for(let x=0; x<logCorridas.length; x++){
        if(logCorridas[x]==1){
            fo[0]=fo[0]+1;
        }else if(logCorridas[x]==2){
            fo[1]=fo[1]+1;
        }else if(logCorridas[x]==3) {
            fo[2]=fo[2]+1;
        }else if(logCorridas[x]==4){
            fo[3]=fo[3]+1;
        }else if(logCorridas[x]==5){
            fo[4]=fo[4]+1;
        }else if(logCorridas[x]==6){
            fo[5]=fo[5]+1;
        }else if(logCorridas[x]>=7){
            fo[6]=fo[6]+1;
        }


    }
    let i=0;
    for(let x=0;x<fo.length; x++){
        i=x+1;
        fe[x]=(numAleatorios.length - i +3)/(Math.pow(2,(i+1)));
    }

  /*   console.log(fe); */

    for(let x=0; x<fo.length; x++){
        Xo[x]= (Math.pow((fo[x]-fe[x]),2)) / fe[x];
        Xo2= Xo2 + Xo[x];
    }

/*     console.log(Xo);
    console.log(Xo2); */

    for(let x=0; x<chiCuadrado.length; x++){
        
        if(chiCuadrado[x][0] == libertad){
             xEsta= chiCuadrado[x][1];
            if(Xo2<xEsta){
                return true;
            }else{
                return false;
            }
        }
        
    }

}


