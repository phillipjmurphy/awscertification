import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FaqService } from '../faq.service';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
@Component({
  selector: 'app-modal-help-content',
  templateUrl: './modal-help-content.component.html',
  styleUrls: ['./modal-help-content.component.css']
})
export class ModalHelpContentComponent implements OnInit {
  @Input() section;
  @Input() topic;
  closeResult: string;
  errorMesage = '';
  playback_rate = 2;
  cur_time = 0;
  marks = [];
  marks_sentence = [];
  marks_words = [];
  currentSentence = '';
  currentWord = '';
  currentSentenceTime = 0;
  constructor(private modalService: NgbModal, private faq_service: FaqService) { }

  ngOnInit() {
  }
  open(content) {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  setCurrentSentence(time) {
    const curTime = time * 1000;
    // console.log('curTime', curTime);
    // console.log(this.marks_sentence.find(x => x.time <= curTime));
    // Filter out those that have passed.
    // Find the last element that is greater than.
    const sentences = this.marks_sentence.filter(x => curTime >= x.time);
    this.currentSentence = sentences[sentences.length - 1].value;
    this.currentSentenceTime = sentences[sentences.length - 1].time;
    // // Should do this... but can't figure out a way that would work
    // document.getElementById(sentences[sentences.length - 1].time)
    //   .scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });

  }
  setCurrentWord(time) {
    const curTime = time * 1000;

    // Filter out those that have passed.
    // Find the last element that is greater than.
    const words = this.marks_words.filter(x => curTime >= x.time);
    this.currentWord += words[words.length - 1].value;

  }
  onTimeUpdate(event) {
    this.setCurrentSentence(event.target.currentTime);
    // this.setCurrentWord(event.target.currentTime);

  }
  oncanplay(event) {
    console.log(event);
    console.log(event.target.attributes['data-marks']);
    const mark_uri = event.target.attributes['data-marks'];
    this.marks.length = 0;
    this.faq_service.getMark(mark_uri.value).subscribe(
      mark => this.marks.push(mark),
      error => this.errorMesage = <any>error,
      () => {
        this.marks_sentence = this.marks.filter(mark => mark.type === 'sentence');
        this.marks_words = this.marks.filter(mark => mark.type === 'word');
      }

    );
  }
}
