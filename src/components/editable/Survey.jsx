import React from "react";

import * as Survey from "survey-react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

import Editable from "./Editable";
import SurveyEditor from "../editingTools/SurveyEditor";

import "survey-react/survey.css";

const styles = {
  header: {
    backgroundColor: '#f3f7f6',
    color: '#000',
    padding: '1rem',
  },
  h3: {
    margin: '0'
  },
  body: {
    padding: '1rem',
    borderTop: '2px solid #01b4aa'
  },
  scoreBox: {
    padding: '0.5em',
    backgroundColor: '#f3f7f6',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '700'
  },
  questionBox: {
    padding: '1rem 0.5rem',
    borderBottom: '1px solid #eee5eb',
    fontSize: '1rem',
    display: 'flex'
  },
  icon: {
    paddingRight: '1rem',
  },
  label: {
    fontWeight: '700',
    marginRight: '0.5rem'
  }
}

const SurveyQuestionReview = ({ question }) => (
  <div style={styles.questionBox}>
    <div style={styles.icon}>{question.isAnswerCorrect() ? <CheckIcon color="primary" /> : <ClearIcon color="secondary" />}</div>
    <div>
      <div><span style={styles.label}>Question:</span><span>{`${question.title}`}</span></div>
      <div><span style={styles.label}>Your response:</span><span>{`${question.value}`}</span></div>
      <div><span style={styles.label}>Our response:</span><span>{`${question.correctAnswer}`}</span></div>
    </div>
  </div>
)

const SurveyResults = ({ survey }) => {
  const correctAnswersCount = survey.getCorrectedAnswerCount();
  const questions = survey.getQuizQuestions();

  return (
    <Paper>
      <div style={styles.header}>
        <h3 style={styles.h3}><span>{survey.title}</span></h3>
      </div>
      <div style={styles.body}>
        <div style={styles.scoreBox}>
          {`You scored: ${correctAnswersCount} / ${questions.length}`}
        </div>
        {
          questions.map((question, index) => (
            <SurveyQuestionReview key={`question-${index}`} question={question} />
          ))
        }
        <div style={styles.scoreBox}>You can see all your quiz results on your <a href='/dashboard'>Dashboard</a>.</div>
      </div>
    </Paper>
  )
}


class EditableSurvey extends React.Component {
  state = { completedSurvey: null };

  handleSave = text => {
    this.props.saveChanges(() =>
      this.props.updateContent(this.props.sectionIndex, this.props.index, { text })
    );
  };

  handleComplete = completedSurvey => {
    this.setState({ completedSurvey })
  }

  componentDidMount() {
    Survey.StylesManager.ThemeColors.default = { ...Survey.StylesManager.ThemeColors.default,
      "$main-color": "#01b4aa", //teal
      "$main-hover-color":"#004440", // dark teal
      "$header-color": styles.header.color,
      "$header-background-color": styles.header.backgroundColor,
    }
    Survey.StylesManager.applyTheme();
  }


  render() {
    const { text, ...rest } = this.props;
    const model = new Survey.Model(text);
    model.completedHtml = "<h3>That's it for this quiz! You can see all your quiz results on your <a href='/dashboard'>Dashboard</a>.</h3>"

    if (this.state.completedSurvey) {
      return <SurveyResults survey={this.state.completedSurvey} />
    }

    return (
      <Editable
        editor={SurveyEditor}
        handleSave={this.handleSave}
        content={{ text: text }}
        surveyEditor={true}
        {...rest}
      >
        <Paper>
          <Survey.Survey
            model={model}
            onComplete={this.handleComplete}
          />
        </Paper>
      </Editable>
    );
  }
};

export default EditableSurvey;
