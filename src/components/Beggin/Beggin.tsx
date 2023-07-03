import React from 'react';
import slika from '../Beggin/Sinatra.jpg'

const Beggin = () => {
  return (
    <div
      data-vc-full-width="true"
      data-vc-full-width-init="true"
      data-stellar-offset-parent="true"
      className="vc_row wpb_row vc_row-fluid bg-pos-center-center bg-no-repeat content-padding vc_custom_1496176576005 vc_row-has-fill vc_row-o-equal-height vc_row-o-content-middle vc_row-flex"
      style={{
        width: '965px',
        position: 'relative',
        left: '0px',
        boxSizing: 'border-box',
        paddingLeft: '0px',
        paddingRight: '0.2px',
      }}
    >
      <div className="bg-no-repeat wpb_column vc_column_container vc_col-sm-5">
        <div className="vc_column-inner">
          <div className="wpb_wrapper">
            <div className="wpb_single_image wpb_content_element vc_align_left xtd-offset-frame" style={{}}>
              <figure className="wpb_wrapper vc_figure">
                <div className="vc_single_image-wrapper xtd-shadow--large-hard vc_box_border_grey">
                  <img
                    width="1500"
                    height="1000"
                    src={slika}
                    className="vc_single_image-img attachment-full"
                    alt=""
                    decoding="async"
                    loading="lazy"
                   sizes="(max-width: 1600px) 100vw, 1600px"
                  />
                </div>
              </figure>
            </div>
            <div className="vc_empty_space xtd-spacer--lg" style={{ height: '2rem' }}>
              <span className="vc_empty_space_inner"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-pos-center-center bg-no-repeat wpb_column vc_column_container vc_col-sm-6 vc_col-sm-offset-1 vc_col-has-fill">
        <div className="vc_column-inner vc_custom_1554999581275">
          <div className="wpb_wrapper">
            <div className="vc_empty_space xtd-spacer--lg" style={{ height: '2rem' }}>
              <span className="vc_empty_space_inner"></span>
            </div>
            <div className="wpb_text_column wpb_content_element vc_custom_1496247242466 xtd-text-shadow--large-hard">
              <div className="wpb_wrapper">
                <blockquote>
                  <p>
                    But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying
                    consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we
                    denounce with righteous indignation and dislike men who are so beguiled and demoralized by the
                    charms.
                    <br />
                    <cite>Frank Sinatra, Founder</cite>
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beggin;
