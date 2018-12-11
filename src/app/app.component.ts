import { Component, OnInit } from '@angular/core';
import { FaqService } from './faq.service';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {

  title = 'AWS-Audio-FAQ';
  another_variable = 'What is this and why ? ';
  playback_rate = 2;

  aws_content = [];
  faqList = ['ec2', 's3', 'vpc', 'route53', 'rds', 'sqs','dynamodb','lambda','api-gateway','elasticbeanstalk','kinesis','kms',
  'AWS_Well_Architected_Framework', 'AWS_Operational_Excellence_Pillar', 'AWS_Security_Pillar',
  'AWS_Reliability_Pillar', 'AWS_Performance_Efficiency_Pillar', 'AWS_Cost_Optimization_Pillar'];  // 'rds','sqs'


  errorMesage = '';
  cur_time = 0;
  marks = [];
  marks_sentence = [];
  marks_words = [];
  currentSentence = '';
  currentWord = '';
  currentSentenceTime = 0;
  ngOnInit(): void {
    // For faq in FAQs
    //
    for ( const faq of this.faqList) {
      this.faq_service.getFaq(faq).subscribe(
        faqRes => this.aws_content.push(faqRes),
        error => this.errorMesage = <any>error
      );

    }

  }

  constructor(private faq_service: FaqService) {

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
    // Should do this... but can't figure out a way that would work
    document.getElementById(sentences[sentences.length - 1].time)
      .scrollIntoView({ behavior: 'instant', block: 'center', inline: 'center' });

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

  // On play we need to get the first sentence/ word etc.
  onplay(event) {
    // Since this is going ot be generic event we need to make sure we get the marks
    // That correspond to the audio being played.
    // Since this is
    // console.log(event);
    // console.log(event.target.attributes['data-marks']);
    // // target.attributes[3]

    // // this.setCurrentSentence(event.target.currentTime);
    // // this.setCurrentWord(event.target.currentTime);
    // // console.log(event.target.currentTime);
    // // console.log(event);
    // this.played = true;
  }
  // panelClicked(event) {
  //   console.log('panel clicked', event);
  // }
  // beforeChange(event: NgbPanelChangeEvent) {

  //   // console.log(event.target);
  //   console.log(event);
  // }

  // getKeys(map){
  //   return Array.from(map.keys());
  // }
}
