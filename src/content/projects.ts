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
        "This is the web application I developed for the research at DSLab that was sponsored by ETRI (Electronics and Telecommunications Research Institute) for the project on Development of Previsional Intelligence Based on Long-term Visual Memory Network.",
        "We researched multimodal video analysis for social forecasting on famous individuals, using a video dataset we developed ourselves. The task: predict whether a video would generate a spike in Google Search Volume for the famous individuals appearing in it. This tool visually demonstrates how the extraction of multimodal features is performed on a video.",
      ],
    },
    {
      kind: "video",
      heading: "Video Processing Explanation",
      // TODO(chris): the old site had no caption here — rewrite in your own words.
      caption: "An explanation of how multimodal feature extraction is performed on a video.",
      src: "/projects/multimodal-encoder-visualizer/video-processing-explanation-1080p.mp4",
      poster: "/projects/multimodal-encoder-visualizer/video-processing-explanation-poster.jpg",
      duration: "6:28",
    },
    {
      kind: "video",
      heading: "App Demonstration",
      // TODO(chris): the old site had no caption here — rewrite in your own words.
      caption: "A demonstration of the visualizer web application.",
      src: "/projects/multimodal-encoder-visualizer/app-demonstration-1080p.mp4",
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

export const projects: Project[] = [multimodalEncoderVisualizer];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Projects still to be ported over from the old Wix site.
 * Move one into `projects` above once its content is written.
 */
export const upcomingProjects = [
  { title: "Smile Detection Project", note: "CV pipeline — data preprocessing, training & testing" },
  { title: "Fraud Detection Project", note: "ML prototype for preventing fraud against seniors" },
  { title: "3D Game Project", note: "Gameplay and rendering work" },
  { title: "VEX Robotics Project", note: "PD controller, odometry, robot design" },
] as const;
