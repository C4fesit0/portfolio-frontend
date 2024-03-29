import { Component, Input, EventEmitter, Output,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProject } from 'src/app/interfaces/IProject.interface';
import { ISkill } from '../../../interfaces/ISkill.interface';
import { IProjectDto } from 'src/app/interfaces/IProjectDto.interface';
import { ProjectService } from '../../../services/project.service';
import { Storage, getDownloadURL, list, listAll, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  host:{
    "class":"card card--project mb-2"
  }
})
export class ProjectComponent implements OnInit {

  @Input() skills:ISkill[] = [];
  @Input() project !:IProject;
  imagen!:string | undefined;
  @Input() edit:boolean=false;

  @Output() eliminarEvent = new EventEmitter<number>();
  existeArchivo: boolean =false;
  event:any;
  tecnologiasIds: number[] = [];

  projectDto:IProjectDto = {
    nombre:'',
    descripcion:'',
    demo:'',
    repositorio:'',
    id_autor:1,
    image:'',
    tecnologias:[]
  }

  constructor(private projectService:ProjectService,
    private modalService: NgbModal,
    private storage:Storage){}

  ngOnInit(){
    this.leerIds();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  eliminarProyecto(){
    this.eliminarEvent.emit(this.project.id);
  }

  leerIds(){
    this.tecnologiasIds = this.project.tecnologias.map((e)=>{
      return e.id;
    })
    console.log(this.tecnologiasIds)
  }


  cargaImagen($event:any):void{
    this.event = $event
    this.existeArchivo=true;
  }

  fieldsetChange(event:any){
    console.log(event.target.checked)
    console.log(event.target.id)
    const id = parseInt(event.target.id);
    const checked = event.target.checked;
    if(checked){
      this.tecnologiasIds.push(id)
    }else if(!checked){
      const index = this.tecnologiasIds.indexOf(id);
      this.tecnologiasIds.splice(index,1)
    }
    console.log(this.tecnologiasIds);
  }

  actualizarProyecto(data:any){
     console.log("ACTUALIZANDO PROYECTO")
     console.log(data.value)
    this.setProyectoDto(data.value);
    console.log(this.projectDto);
     if(this.existeArchivo){
        this.projectService.updateProject(this.projectDto,this.project.id).subscribe((project)=>{
        const name = "projects/project_"+project.id;
        const file = this.event.target.files[0];
        const imageRef= ref(this.storage, `images/`+name);
        uploadBytes(imageRef,file)
            .then(async res =>{
              const imagesRef = ref(this.storage,'images/projects/project_'+project.id);
              await getDownloadURL(imagesRef).then((url)=>{
                this.projectDto.image = url;
                console.log("Se carga URL");
                console.log(this.projectDto);
                this.existeArchivo =false;
                  this.projectService.updateProject(this.projectDto,project.id).subscribe((e)=>{
                    console.log(e);
                    this.project = e;
                    this.existeArchivo =false;
                  })
              })
            })
            .catch(err=>{
              console.log(err);
            })
        })
       }else{
        this.projectDto.image= this.project.image;
          this.projectService.updateProject(this.projectDto,this.project.id).subscribe((e)=>{
            console.log(e);
           this.existeArchivo =false;
            this.project = e;
          })
       }
  }

  setProyectoDto(data:any){
    this.projectDto.demo = data.demo;
    this.projectDto.descripcion = data.descripcion;
    this.projectDto.image= '';
    this.projectDto.nombre= data.nombre;
    this.projectDto.repositorio= data.repositorio;
    this.projectDto.tecnologias= this.tecnologiasIds;
    console.log(this.project);
  }


  existeTecnologia(skill:ISkill){
    return this.project.tecnologias.find((e)=>{
      return e.id==skill.id
    })
  }

}
