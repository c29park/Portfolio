import {
  escapeFromMars,
  fraudDetection,
  smileDetection,
  vexRobotics,
} from "./projects-ported";

export type Block =
  | { kind: "prose"; heading?: string; paragraphs: string[] }
  | {
      kind: "video";
      heading: string;
      caption?: string;
      /** Local path under /public, or an absolute URL to a hosted file. */
      src: string;
      poster: string;
      /** Human-readable runtime, e.g. "6:28". */
      duration: string;
    }
  | {
      kind: "youtube";
      heading: string;
      caption?: string;
      /** The 11-character ID from the watch URL: youtu.be/<videoId>. */
      videoId: string;
      /** Local poster path. Falls back to YouTube's thumbnail when omitted. */
      poster?: string;
      duration: string;
    }
  | {
      kind: "code";
      heading?: string;
      caption?: string;
      /** Preformatted text. Line breaks and spacing are preserved verbatim. */
      text: string;
    }
  | {
      kind: "figure";
      heading?: string;
      caption?: string;
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      kind: "table";
      heading?: string;
      caption?: string;
      columns: string[];
      rows: string[][];
      /** Row indices rendered with emphasis. */
      emphasize?: number[];
    };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  period: string;
  org: string;
  tags: string[];
  cover: string;
  blocks: Block[];
};

const multimodalEncoderVisualizer: Project = {
  slug: "multimodal-encoder-visualizer",
  title: "Multimodal Encoder Visualizer",
  summary:
    "A web app that visually demonstrates how multimodal features are extracted from a video, built for social-forecasting research at DSLab.",
  period: "2025",
  org: "DSLab, Kwangwoon University — sponsored by ETRI",
  tags: ["Multimodal ML", "Video Analysis", "Web App", "Research"],
  cover: "/projects/multimodal-encoder-visualizer/app-demonstration-poster.jpg",
  blocks: [
    {
      kind: "prose",
      heading: "Overview",
      paragraphs: [
        "This is the web application I developed for the research at [DSLab](https://sites.google.com/site/datasciencelaboratory) that was sponsored by ETRI (Electronics and Telecommunications Research Institute) for the project on Development of Previsional Intelligence Based on Long-term Visual Memory Network.",
        "We researched multimodal video analysis for social forecasting on famous individuals, using a video dataset we developed ourselves. The task: predict whether a video would generate a spike in Google Search Volume for the famous individuals appearing in it. This tool visually demonstrates how the extraction of multimodal features is performed on a video.",
      ],
    },
    {
      kind: "youtube",
      heading: "Video Processing Explanation",
      caption:
        "How the visualizer extracts multimodal features from a video: active speaker detection and diarization, vocal emotion analysis, and facial expression analysis.",
      videoId: "msgui-kY1lY",
      poster: "/projects/multimodal-encoder-visualizer/video-processing-explanation-poster.jpg",
      duration: "6:28",
    },
    {
      kind: "youtube",
      heading: "App Demonstration",
      // TODO(chris): written from the thumbnail, not the full video — adjust if off.
      caption:
        "A walkthrough of the tool running end to end on a real video, showing the extracted features alongside the transcript.",
      videoId: "igmpV1qh1a4",
      poster: "/projects/multimodal-encoder-visualizer/app-demonstration-poster.jpg",
      duration: "14:16",
    },
    {
      kind: "table",
      heading: "Video dataset",
      caption: "The dataset we built for the task.",
      columns: ["Category", "Value"],
      rows: [
        ["# of Unique Videos", "7,335"],
        ["Avg. Video Duration", "9m 17s"],
        ["Total Duration", "47d 6h 40m 59s"],
        ["# of Famous Figures", "177"],
        ["Period", "Jan 1, 2023 – Jun 30, 2025"],
        ["# of Video–Person Pairs", "22,540"],
        ["# of Pairs with Label = 1", "6,865"],
      ],
    },
    {
      kind: "figure",
      caption: "Pie chart of the types of famous individuals in the dataset.",
      src: "/projects/multimodal-encoder-visualizer/video-dataset-pie-chart.png",
      alt: "Pie chart of occupation type distribution: Celebrity 47.5%, Politician 35.5%, Entrepreneur 17.0%",
      width: 546,
      height: 480,
    },
    {
      kind: "prose",
      heading: "LLM baseline results",
      paragraphs: [
        "Prior to switching to multimodal inputs, I fed video transcripts to an LLM (Gemini Flash 2.5) to predict the public salience of the public figures, so that we could verify the feasibility of the research task.",
      ],
    },
    {
      kind: "figure",
      caption: "Confusion matrix for the transcript-only LLM baseline (jump-first framing).",
      src: "/projects/multimodal-encoder-visualizer/llm-baseline-results-1.png",
      alt: "Confusion matrix. Actual Jump: 1911 predicted Jump, 852 predicted No Jump. Actual No Jump: 1502 predicted Jump, 1212 predicted No Jump.",
      width: 549,
      height: 456,
    },
    {
      kind: "table",
      caption: "Baseline metrics. Recall and sensitivity held up; specificity and accuracy did not.",
      columns: ["Metric", "Value"],
      rows: [
        ["Precision", "0.56"],
        ["Recall", "0.69"],
        ["F1-score", "0.62"],
        ["Sensitivity", "0.69"],
        ["Specificity", "0.44"],
        ["Accuracy", "0.57"],
      ],
      emphasize: [1, 3],
    },
  ],
};

/** Ordered newest-first; this is the order the home page grid renders. */
export const projects: Project[] = [
  multimodalEncoderVisualizer,
  smileDetection,
  fraudDetection,
  escapeFromMars,
  vexRobotics,
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
