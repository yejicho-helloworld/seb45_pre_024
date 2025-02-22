import PropTypes from 'prop-types';
import './Question.css';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

function timeSince(date) {
  // "2023-08-18T07:13:57.415783"
  let newDate = Date.parse(date);
  let seconds = Math.floor((new Date() - newDate) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}

const Question = ({ info }) => {
  const quDetail = info.body.replace(/<[^>]*>?/g, ' ');
  // const changer = ReactHtmlParser(info.body);
  // const quDetail = changer.slice(0, 60);

  return (
    <div>
      <section className="quBox">
        <div className="quStats">
          <div className="quVote">0 votes</div>
          <div className="quAnswer">{info.accepted} 0 answers</div>
          <div className="quView">{info.view_count} views</div>
        </div>
        <div className="quContent">
          <h3 className="quTitle">
            <Link to={`/questions/${info.question_id}`}>
              <span>{info.title}</span>
            </Link>
          </h3>
          <div className="quDetail">
            <span>{ReactHtmlParser(quDetail)}</span>
          </div>

          <div className="quAuthor">
            <div className="quUser">{info.username}</div>
            <div className="quTime">asked {timeSince(info.created_at)} ago</div>
          </div>
        </div>
      </section>
    </div>
  );
};
Question.propTypes = {
  info: PropTypes.object,
};
export default Question;
