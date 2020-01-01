import { Component, OnInit, Input } from '@angular/core';
import { SectionProps } from 'src/app/editor/models/section-props';
import { TemplateService } from 'src/app/editor/services/template.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: [ './preview.component.scss' ]
})
export class PreviewComponent implements OnInit {

  @Input() public hideBtn: boolean;
  public showLoader: boolean;
  public template: SectionProps[];
  public rows: number[];

  constructor(private templateService: TemplateService) {
    this.template = []; /*Do API Call*/
    const sections = [
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
        type: 'text',
        text: 'Small Text',
        style: {
          fontSize: '',
          fontColor: '',
          backgroundColor: '',
          fontWeight: ''
        }
      },
      {
        type: 'text',
        text: 'Lorem Ipsum is simply a Date',
        style: {
          fontSize: '',
          fontColor: '',
          backgroundColor: '',
          fontWeight: ''
        }
      },
      {
        type: 'text',
        text: 'Be ready with your wishlist!!',
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
    try {
      const request = JSON.parse(localStorage.getItem('request'));
      this.template = JSON.parse(request.sections)
    } catch (e) {
      /*Load sample data if no request*/
      this.template = sections;
    }
    /*Do this after API call*/
    this.generateRows();
  }

  ngOnInit() {
  }

  generateTemplate() {
    this.showLoader = true;
    this.templateService.generateTemplate().then((response) => {
      this.showLoader = false;
      console.log(response)
    })
  }

  generateRows() {
    this.rows = [];
    let max = 0;
    const arrayLength = this.template.length;
    for (let i = 0; i < arrayLength; i++) {
      let t = this.template[ i ];
      max = t.gid > max ? t.gid : max;
    }
    for (let i = 0; i <= max; i++) {
      this.rows.push(i);
    }
  }
}
