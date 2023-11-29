import { Component } from '@angular/core';
import {Feedback, mapApiDataToFeedback} from "../../../api/feedback";
import {mapApiDataToEmployee} from "../../../api/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee/employee.service";
import {RestaurantService} from "../../../service/restaurant/restaurant.service";
import {MessageService} from "primeng/api";
import {FeedbackService} from "../../../service/feedback/feedback.service";

@Component({
  selector: 'app-feedback-listing',
  templateUrl: './feedback-listing.component.html',
  styleUrls: ['./feedback-listing.component.scss']
})
export class FeedbackListingComponent {

  feedbacks: Feedback[] = [];

  cols: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private messageService: MessageService,) { }

  ngOnInit() {
    this.loadFeedbacks();

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'warning', header: 'warning' },
      { field: 'content', header: 'content' },
      { field: 'createdAt', header: 'createdAt' },
      { field: 'author', header: 'author' },
      { field: 'employee', header: 'employee' },
    ];
  }


  async loadFeedbacks() {
    try {
      const response = await this.feedbackService.getFeedbacks();
      this.feedbacks = response.map((feedbackData: any) => mapApiDataToFeedback(feedbackData));
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des feedbacks '
      });
    }
  }

}
