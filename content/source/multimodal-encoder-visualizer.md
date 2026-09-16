# Multimodal Encoder Visualizer

Imported from the old Wix portfolio: https://changhapark0501.wixsite.com/mysite/about-4-1

> Note: the original page title was misspelled "Multimdoal Encoder Visualizer". Corrected here.

---

## Intro paragraph (verbatim from old site)

Above is a video explaining and demonstrating the web application I developed for the
research at DSLab that was sponsored by ETRI (Electronics and Telecommunications Research
Institute) for the project on Development of Previsional Intelligence Based on Long-term
Visual Memory Network.

We did a research on multimodal video analysis for social forecasting on famous individuals
using the video dataset that we developed. The research is about predicting whether a video
would generate a spike in Google Search Volume data of the famous individuals appearing by
such analysis. This tool visually demonstrates how the extraction of multimodal features is
performed on a video.

---

## Section 1 — Video Processing Explanation

- File: `video-processing-explanation-1080p.mp4` (1920x1080, 6:28 / 388.13s, 23 MB)
- Poster: `video-processing-explanation-poster.jpg`
- Original Wix source: `https://video.wixstatic.com/video/fbaf34_2b66777b079749b88611c85cc4bbbb39/1080p/mp4/file.mp4`
- Original upload name: `2025-09-16 13-37-56.mkv`
- Other qualities available at the same path with `720p` / `480p` in place of `1080p`.

## Section 2 — App Demonstration

- File: `app-demonstration-1080p.mp4` (1920x1080, 14:16 / 855.95s, 97 MB)
- Poster: `app-demonstration-poster.jpg`
- Original Wix source: `https://video.wixstatic.com/video/fbaf34_ba7ae59a05e343b38bc8ffcd868d2fc7/1080p/mp4/file.mp4`
- Original upload name: `2025-09-17 03-55-02.mkv`

> The old page had no per-video caption text — only these two headings. The intro paragraph
> above sat in the section directly below both videos.

## Section 3 — Video dataset

- `video-dataset-1.png` — summary table of the dataset:
  | Category | Value |
  |---|---|
  | # of Unique Videos | 7,335 |
  | Avg. Video Duration | 9m 17s |
  | Total Duration | 47d 6h 40m 59s |
  | # of Famous Figures | 177 |
  | Period | Jan 1st, 2023 – June 30th, 2025 |
  | # of Video-Person Pairs | 22,540 |
  | # of Pairs with Label = 1 | 6,865 |

- `video-dataset-pie-chart.png` — caption on the old site: **"Pie chart of the types of famous individuals"**.
  Occupation Type Distribution: Celebrity 47.5%, Politician 35.5%, Entrepreneur 17.0%.

## Section 4 — LLM Baseline results

Caption text (verbatim):

> Prior to switching to multimodal based inputs, I gave in video transcripts to an LLM
> (Gemini flash 2.5) to predict public salience of the public figures so that we could
> verify the feasibility of the research task.

- `llm-baseline-results-1.png` — Confusion Matrix (Jump First):
  | | Predicted Jump | Predicted No Jump |
  |---|---|---|
  | **Actual Jump** | 1911 | 852 |
  | **Actual No Jump** | 1502 | 1212 |

- `llm-baseline-results-2.png` — metrics:
  | Metric | Value |
  |---|---|
  | Precision | 0.56 |
  | Recall | **0.69** |
  | F1-score | 0.62 |
  | Sensitivity | **0.69** |
  | Specificity | 0.44 |
  | Accuracy | 0.57 |

---

## Related context from the old home page

Research: "Public Salience Prediction on Famous Individuals with Multimodal Analysis" —
co-author at DSLab, Kwangwoon University, South Korea.
