import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {TermDialogComponent} from "../term-dialog/term-dialog.component";
import {ModuleService} from "../../services/module.service";
import {Module} from "../../models/module";
import {ActivatedRoute} from "@angular/router";
import {SubjectService} from "../../services/subject.service";
import {Subject} from "../../models/subject";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  panelOpenState = false;
  constructor(public dialog: MatDialog,
              private moduleService: ModuleService,
              private subjectService: SubjectService,
              private route: ActivatedRoute) {
  }

  modules: Module[];
  subjects: Subject[];
  departmentId: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    });
    this.moduleService.getModulesByDepartmentId(1).subscribe((data)=>{
      this.modules = data});
  }

  getSubjects(moduleId: number)
  {
    this.subjectService.getSubjectsByModuleIdAndDepartmentId(1, moduleId).subscribe((data)=>{
      this.subjects = data});
  }

  openDialog(subjectId: number) {
    this.dialog.open(TermDialogComponent, {
      data: subjectId
    });
  }
}
