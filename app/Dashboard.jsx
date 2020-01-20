import React from 'react';
import PropTypes from 'prop-types';
import SelectDate from './SelectDate';
import Section from './Section';
import * as Utils from './Utils';
import { baseURL } from './Constants';

class Dashboard extends React.Component {
  onClickPagespeed = (event, data) => {
    const {
      results,
      timestamps,
      profileUrl,
    } = Utils.formatDashboard(this.props);

    const { _index: index } = data[0];
    const timestamp = timestamps[index];
    const result = this.getResult(results, timestamp)[0];
    const encodedUrl = encodeURIComponent(profileUrl);
    const insightsUrl = `https://developers.google.com/speed/pagespeed/insights/?url=${encodedUrl}`;
    const lighthouseUrl = `https://www.webpagetest.org/lighthouse.php?test=${result.id}`;

    if (event.shiftKey) {
      window.open(lighthouseUrl, '_blank');
    } else {
      window.open(insightsUrl, '_blank');
    }
  }

  onClickWpt = (event, data) => {
    const {
      results,
      timestamps,
      wptUrl,
    } = Utils.formatDashboard(this.props);
    if (!data.length || !wptUrl) return;

    const { _index: index } = data[0];
    const timestamp = timestamps[index];
    const result = this.getResult(results, timestamp)[0];
    const testUrl = `${wptUrl}/result/${result.id}/`;

    window.open(testUrl, '_blank');
  }

  getResult = (results, timestamp) => (
    results
      .filter(({ date }) => (
        (date === timestamp)
      ))
      .map(obj => obj)
  )

  render() {
    const {
      profiles,
      profile,
      profile: { parameters: { url, connectivity, location } },
      onProfileChange,
      onPeriodChange,
    } = this.props;

    const {
      lastResult,
      videoFrames,
      wptUrl,
    } = Utils.formatDashboard(this.props);

    return (
      <div className="u-wrapper">
        <section className="u-wrapper__nav">
          <div className="nav__profiles">
            {profiles.map(({ slug, name }) => (
              <div
                key={slug}
                role="button"
                tabIndex={0}
                className={slug === profile.slug ? 'active' : ''}
                name={slug}
                onClick={() => onProfileChange(slug)}
                onKeyPress={() => onProfileChange(slug)}
              >
                {name}
              </div>
            ))}
          </div>
          <a className="new-profile" href={`${baseURL}/create`}>Add new site</a>
          <SelectDate
            onPeriodChange={onPeriodChange}
          />
        </section>
        <section className="u-wrapper__profile">
          <span>
            Url:&nbsp;
            {url}
          </span>
          <span>
            Location:&nbsp;
            {location}
          </span>
          <span>
            Connectivity:&nbsp;
            {connectivity}
          </span>
        </section>
        <section className="u-wrapper__sections">
          <Section
            {...this.props}
            id="loadTimes"
            footNote={(
              <span>
                Click on a data point to see the corresponding WebPageTest result
              </span>
            )}
            lastResult={lastResult}
            metrics={['TTFB', 'loadTime', 'fullyLoaded']}
            onClick={this.onClickWpt}
            title="Load times"
            yLabel="Time (seconds)"
          />
          <Section
            {...this.props}
            id="rendering"
            footNote={(
              <span>
                Click on a data point to see the corresponding WebPageTest result
              </span>
            )}
            lastResult={lastResult}
            onClick={this.onClickWpt}
            metrics={['firstPaint', 'SpeedIndex', 'visualComplete']}
            title="Rendering"
            yLabel="Time (seconds)"
          />
          <Section
            {...this.props}
            id="pagespeed"
            footNote={(
              <span>
                Click on a data point to see the Google PageSpeed report.
                <br />
                Shift+Click to see the Lighthouse report.
              </span>
            )}
            lastResult={lastResult}
            maxValue={100}
            metrics={['lighthouse']}
            onClick={this.onClickPagespeed}
            title="Lighthouse"
            yLabel="Score (0-100)"
          />
          <Section
            {...this.props}
            id="contentBreakdownBytes"
            footNote={(
              <span>
                Click on a data point to see the corresponding WebPageTest result
              </span>
            )}
            lastResult={lastResult}
            onClick={this.onClickWpt}
            metrics={[
              'breakdown.html.bytes',
              'breakdown.js.bytes',
              'breakdown.css.bytes',
              'breakdown.image.bytes',
              'breakdown.flash.bytes',
              'breakdown.font.bytes',
              'breakdown.other.bytes',
            ]}
            title="Content breakdown (size)"
            yLabel="Traffic (kilobytes)"
          />
          <Section
            {...this.props}
            id="contentBreakdownRequests"
            footNote={(
              <span>
                Click on a data point to see the corresponding WebPageTest result
              </span>
            )}
            lastResult={lastResult}
            onClick={this.onClickWpt}
            metrics={[
              'breakdown.html.requests',
              'breakdown.js.requests',
              'breakdown.css.requests',
              'breakdown.image.requests',
              'breakdown.flash.requests',
              'breakdown.font.requests',
              'breakdown.other.requests',
            ]}
            title="Content breakdown (requests)"
            yLabel="Requests"
          />
          {videoFrames.length && wptUrl
          && (
            <div className="c-Section">
              <h3 className="c-Section__title">Latest filmstrip view</h3>
              <div className="c-Filmstrip">
                {videoFrames.map((frame) => {
                  const { _t: t, _vc: vc, _i: name } = frame;
                  const progress = `${t / 1000}s`;

                  return (
                    <div key={name} className="c-Filmstrip__item">
                      <p className="c-Filmstrip__progress">
                        {progress}
                        (
                        {vc}
                        %)
                      </p>
                      <img
                        alt="Screenshot"
                        className="c-Filmstrip__image"
                        src={Utils.getVideoFrameURL(wptUrl, lastResult.id, frame)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
  profiles: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  onProfileChange: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
};

export default Dashboard;
