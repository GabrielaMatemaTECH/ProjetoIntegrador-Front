import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  produto: Produto = new Produto()
  listaProduto: any = []

  categoria: Categoria = new Categoria()
  listaCategoria: Categoria[]
  idCategoria: number

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    public produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    
    window.scroll(0,0)

    if (environment.token == '') {
      this.router.navigate(['/inicio'])
    }

  
  this.getAllCategoria()
  this.getAllProdutos()

  }

  getAllCategoria(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
    this.listaCategoria = resp
    })
    }

    findByIdCategoria() {
      this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp : Categoria)=> {
      this.categoria = resp
    })
    }

    getAllProdutos(){
      this.produtoService.getAllProduto().subscribe((resp: Produto[])=>{
      this.produtoService.listaProdutos = resp
      this.listaProduto = this.produtoService.listaProdutos
      
      })
      }

    publicar(){
    this.categoria.id = this.idCategoria
    this.produto.categoria= this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=>{
    this.produto = resp
    this.alertas.showAlertSuccess('Cadastro de produto realizado com sucesso!')
    this.produto = new Produto()
    this.getAllProdutos()
    })
    }

}