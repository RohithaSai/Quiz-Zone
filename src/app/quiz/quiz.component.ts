import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx'
import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';

@Component({
  selector: 'quiz-app',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  ticks = 0;
  secondsDisplay: number = 0;
  sub: Subscription;
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': false,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 10,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': false,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 10,
    count: 1
  };







  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
    this.startTimer();
  }

  loadQuiz(quizName: string) {

    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res); //json to model
    });
    this.mode = 'quiz';
  }
  private startTimer() {

        let timer = Observable.timer(1, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = t;

                this.secondsDisplay = this.getSeconds(this.ticks);

            }
        );
    }

    private getSeconds(ticks: number) {
      let seconds = 60;
      if (this.ticks > seconds) {
        this.onSubmit();

      }
        return this.pad(ticks % 60);
    }

    private pad(digit: any) {
       return digit <= 9 ? '0' + digit : digit;
   }
  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {        //mcq's
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });  //checkbox selection
    }


  }


  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));
    console.log(this.quiz.questions);
    this.mode = 'result';
  }
}
