const body=require('body-parser')
const express=require('express')
const app=express()

app.use(express.static('.'))
/*
- Função: Serve arquivos estáticos (HTML, CSS, JS, imagens, etc.) diretamente para o cliente.
- O parâmetro '.': Indica que a pasta raiz do projeto será usada como diretório de arquivos estáticos.
- Exemplo prático: Se você tiver um arquivo index.html na raiz, ao acessar http://localhost:3000/index.html, o Express vai entregá-lo automaticamente. */

app.use(body.urlencoded({extended:true}))
/*
- Função: Permite que o servidor interprete dados enviados via formulários HTML (método POST).
- urlencoded: Significa que os dados vêm no formato application/x-www-form-urlencoded (padrão de formulários).
- extended:true: Permite que objetos complexos (com arrays e objetos aninhados) sejam representados corretamente.
- Exemplo prático: Se você enviar um formulário com campos nome=João&idade=25, o Express transforma isso em um objeto { nome: 'João', idade: '25' }.
*/
app.use(body.json())
/*
- Função: Permite que o servidor entenda requisições com corpo em formato JSON.
- Exemplo prático: Se o cliente enviar { "nome": "Maria", "idade": 30 } no corpo da requisição, o Express converte isso em um objeto JavaScript acessível em req.body.
*/

const multer=require('multer')

const storage=multer.diskStorage({
    destination:function (req,file,callback){
        callback(null,'./upload')//define a pasta
    },
    filename:function(req,file,callback){  //seleciona o nome
        callback(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload=multer({storage}).single('arquivo')
app.post('/upload',(req,res)=>{
upload(req,res,err =>{
       if(err){
        return res.end('Ocorreu um erro')
    }
    res.end('Concluído!')
})
 
})

// app.get('/teste',(req,res)=>res.send(new Date))
app.listen(8080,()=>console.log(`Executando!...`))

