import { Component, OnInit, HostListener } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SectionProps } from 'src/app/editor/models/section-props';
import { TemplatePlaceholdersService } from 'src/app/editor/services/template-placeholders.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: [ './design.component.scss' ]
})
export class DesignComponent implements OnInit {

  public template: SectionProps[];
  public selectedCell: string;
  public rows: number[];
  public rowA: any;
  public rowB: any;
  public icons = { image: 'image', text: 'file-text', button: 'square' };
  public elements = [
    {
      type: 'image',
      url: 'assets/img/ecart-logo.PNG',
      style: {
        fontSize: '',
        fontColor: '',
        backgroundColor: '',
        fontWeight: ''
      }
    },
    {
      type: 'text',
      text: 'Lorem Ipsum is simply dummy text of the !!!!!',
      style: {
        fontSize: '',
        fontColor: '',
        backgroundColor: '',
        fontWeight: ''
      }
    },
    {
      type: 'button',
      text: 'submit',
      style: {
        fontSize: '',
        fontColor: '',
        backgroundColor: '',
        fontWeight: ''
      }
    }
  ];

  constructor(private templatePlaceholdersService: TemplatePlaceholdersService) {
    this.template = []; /*Empty template*/
    this.templatePlaceholdersService.sections.next(this.template);
    this.templatePlaceholdersService.getIndex().subscribe(response => {
      this.selectCell(response);
    });
  }

  ngOnInit() { }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      let clone = JSON.parse(JSON.stringify(event.previousContainer.data[ event.previousIndex ]));
      event.container.data.splice(event.currentIndex, 0, clone);// Add the clone to the new array.
      this.generateId();
      this.templatePlaceholdersService.sections.next(this.template);
      this.templatePlaceholdersService.index.next(event.currentIndex);
    }
  }

  generateId() {
    let id = null;
    let previousId = null;
    let max = 0;
    const arrayLength = this.template.length;
    for (let i = 0; i < arrayLength; i++) {
      let t = this.template[ i ];
      if (t.rowId === undefined) {
        id = (previousId !== null) ? (previousId + 1) : i;
        t.rowId = id;
      } else {
        if (id !== null && t.rowId >= id) {
          t.rowId += 1;
        }
      }
      previousId = t.rowId;
      max = t.rowId > max ? t.rowId : max;
      t.index = i;
    }
    this.rows = [];
    for (let i = 0; i <= max; i++) {
      this.rows.push(i);
    }
  }

  selectCell(index) {
    const arrayLength = this.template.length;
    let col = 0;
    let row;
    for (let i = 0; i < arrayLength; i++) {
      let t = this.template[ i ];
      if (i === index) {
        row = t.rowId;
      }
    }
    for (let i = 0; i < arrayLength; i++) {
      if (i === index) break;
      let t = this.template[ i ];
      if (t.rowId === row) {
        col++;
      }
    }
    this.selectedCell = row + '' + col;
    if (this.rowA === undefined) {
      this.rowA = row;
    } else {
      if (this.rowB === undefined) {
        if (parseInt(row) > parseInt(this.rowA)) {
          this.rowB = row;
        } else if (parseInt(row) < parseInt(this.rowA)) {
          /*Do nothing if the rows are same*/
          let tempRow = this.rowA;
          this.rowA = row;
          this.rowB = tempRow;
        }
      } else {
        if (parseInt(row) < parseInt(this.rowB)) {
          this.rowA = row;
        } else if (parseInt(row) > parseInt(this.rowB)) {
          /*Do nothing if the rows are same*/
          this.rowB = row;
        }
      }
    }
  }

  merge() {
    this.rowA = parseInt(this.rowA);
    this.rowB = parseInt(this.rowB);
    if (this.rowA < this.rowB) {
      for (let i = 0; i < this.template.length; i++) {
        let t = this.template[ i ];
        if (t.rowId === this.rowB) {
          t.rowId = this.rowA;
        } else if (t.rowId > this.rowB) {
          t.rowId--;
        }
      }
      this.rows.pop(); /*Pop out one row*/
      this.rowA = this.rowB = undefined;
    }
  }
}
