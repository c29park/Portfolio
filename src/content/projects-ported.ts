import type { Project } from "./projects";

/**
 * Projects ported from the previous Wix site. Each Wix project had sub-pages
 * (e.g. "data preprocessing", "PD Controller"); those are flattened into
 * sections here, so one project reads as one page.
 */

export const smileDetection: Project = {
  slug: "smile-detection",
  title: "Smile Detection Project",
  summary:
    "A convolutional neural network that decides whether the person in an image is smiling, trained on 4,000 labelled face images.",
  period: "2024",
  org: "Personal project",
  tags: ["Computer Vision", "CNN", "TensorFlow / Keras", "Python"],
  cover: "/projects/smile-detection/sample-images.png",
  blocks: [
    {
      kind: "prose",
      heading: "Overview",
      paragraphs: [
        "Smile detection project determines if a person in an image is smiling or not based on an AI model. In this project, I trained an AI model with 4000 different images of people smiling and not smiling that I downloaded from [truongnmt/smile-detection](https://github.com/truongnmt/smile-detection).",
        "The GitHub repository for my project's code is [c29park/SmileDetectionProject](https://github.com/c29park/SmileDetectionProject).",
      ],
    },
    {
      kind: "prose",
      heading: "Data preprocessing",
      paragraphs: [
        "This is a section that describes the data preprocessing stage of overall sequence. The original dataset files are accessed through the directory and are used to make train and test datasets.",
      ],
    },
    {
      kind: "prose",
      heading: "1. Data download",
      paragraphs: [
        "This cell downloads the necessary data files from Kaggle. The dataset folder consisted of train and test folders, each of which had a folder containing images of real faces that are not smiling and another folder for smiling images. Once I downloaded the dataset, I modified the dataset folder so that it had two folders for not-smiling and smiling images without having test and train separation at first. The reason behind this was to have the data raw and have them similar to ordinary datasets from Scikit-learn.",
      ],
    },
    {
      kind: "figure",
      caption:
        "The Kaggle download cell, followed by the data formatting code described below.",
      src: "/projects/smile-detection/data-formatting-code.png",
      alt: "Jupyter notebook showing an opendatasets Kaggle download cell, then a preprocessing cell that loads images from not_smiling and smiling folders into X and y arrays.",
      width: 1189,
      height: 884,
    },
    {
      kind: "prose",
      heading: "2. Data formatting",
      paragraphs: [
        'Above code imports necessary libraries and objects to use including tensorflow, numpy, LabelEncoder, and etc. In this code, I create one variable for the directory to be able to access the files saved on my operating system and another variable called categories to be able to distinguish between the two folders named "not_smiling" and "smiling" in the "datasets" folder. X and y are variables that would store every image in a certain format and the corresponding labels, respectively.',
        'The nested for loop helps the program navigate through the paths to the file location to be able to retrieve the images properly for each "not_smiling" and "smiling" image. Once the program enters the first layer of the for loop, it declares a path which concatenates the folder name ("category") to the directory. For example, if the variable category was not_smiling, then the path would be "C:\\dev\\aicode\\smiledetection\\datasets\\not_smiling". For the second layer then, it starts iterating through the collection of images in the folder. It gets the image path with the same way of concatenation and loads the correct image with the desired width (47) and height (67).',
        "Then, the image is transformed to an array of pixel values with shape (47, 67, 3), where 3 corresponds to RGB channels, each ranging from 0 to 255. In the X list, the image is added. To update the y list, it gets the label by reading the image path from right to left skipping a back slash and separating two folders. To make sure that the correct label for the image is added, I put the additional conditional statement. Lastly, by doing the operation 4000 times in total, the program ends up with an array of data with shape (4000, 47, 67, 3) and an array of 4000 labels. The 4th dimensional state of data requirement for using CNN is thereby satisfied.",
      ],
    },
    {
      kind: "prose",
      heading: "3. Data for training and testing",
      paragraphs: [
        "Using train_test_split, the program splits the original raw data to training dataset and testing dataset and the target data to the respective labels for the datasets. Since the test_size is 0.20, the training dataset would have 4000*0.80 = 3200 images and the testing dataset would have 800 images. Then each dataset is normalized by dividing the values by 255 to produce a value range from 0 to 1 for better performance in the neural network.",
      ],
    },
    {
      kind: "figure",
      src: "/projects/smile-detection/train-test-split-code.png",
      alt: "Code calling train_test_split with test_size 0.20, then dividing both datasets by 255 to normalize.",
      width: 600,
      height: 81,
    },
    {
      kind: "prose",
      heading: "4. Data visualization",
      paragraphs: [
        "Let's see if the images were accessed properly and everything written above worked by printing out some sample images with matplotlib.pyplot. In this code, I plotted and printed out 8 images from the training dataset with labels.",
      ],
    },
    {
      kind: "figure",
      src: "/projects/smile-detection/sample-images.png",
      alt: "A grid of eight sample face images from the training set, each captioned with its smiling or not_smiling label.",
      width: 600,
      height: 363,
    },
    {
      kind: "prose",
      heading: "5. One-hot encoding",
      paragraphs: [
        "By using LabelEncoder, the not_smiling labels are converted to a numerical value 0 and the smiling labels are converted to 1.",
      ],
    },
    {
      kind: "figure",
      src: "/projects/smile-detection/one-hot-encoding-code.png",
      alt: "Code applying LabelEncoder to convert the not_smiling and smiling labels to 0 and 1.",
      width: 600,
      height: 55,
    },
    {
      kind: "prose",
      heading: "Training & testing",
      paragraphs: [
        "This section describes the overall architecture and tuning of convolutional neural network and how the model was trained and tested with data.",
      ],
    },
    {
      kind: "figure",
      heading: "1. Convolutional neural network",
      src: "/projects/smile-detection/cnn-architecture-code.png",
      alt: "Keras model definition with two Conv2D layers, max pooling, dropout, flatten, and dense layers, followed by the model summary.",
      width: 600,
      height: 535,
    },
    {
      kind: "prose",
      paragraphs: [
        "First, all the functions to build neural network layers are imported. The first layer of the model is Conv2D, where 32 image data are number of outputs, and kernel (weight vector) size is set to 5*5, input shape to the shape of each image (47, 67, 3), and activation function set as rectified linear unit (= max(x, 0)). The layer does not perform padding because it's not necessary to prevent the output tensor's dimensionality from shrinking for a fairly large dataset.",
        "Instead, pooling is applied to make the reduction with pooling size 3*3, where each of 9 elements would be the highest number from the 3*3 size. After that, dropout is executed for 0.25 portion, where this is the portion for nodes that will not be in use. In a similar way, another layer of Conv2D is added. Then, the matrix formatted data is converted to a vector format by using Flatten function. Lastly, a fully connected layer (Dense) is added followed by a drop out of 0.5, and then another layer is added this time with softmax function as activation function for two classes. The summary at the end shows the summary of the layers added.",
      ],
    },
    {
      kind: "figure",
      heading: "2. Model testing",
      src: "/projects/smile-detection/model-testing-code.png",
      alt: "Code compiling and fitting the model, saving it as a keras file, and printing the evaluated accuracy.",
      width: 600,
      height: 207,
    },
    {
      kind: "prose",
      paragraphs: [
        "The model generated above is saved as smile_dector_model as a keras file. The model is compiled with parameters above to evaluate the accuracy score. After some fine-tuning for the hyperparameters of the model above and the batch size and number of epochs, the model reached accuracy of 99.2 percent. With the training dataset, the accuracy was 99.9 percent whereas with the testing dataset, the accuracy was 90.8 percent.",
      ],
    },
  ],
};

export const fraudDetection: Project = {
  slug: "fraud-detection",
  title: "Fraud Detection Project",
  summary:
    "A prototype for a mobile app that monitors calls, texts, and emails for fraudulent behaviour and alerts users and their family before they act on it.",
  period: "2024",
  org: "First work term",
  tags: ["Machine Learning", "NLP", "Azure AI", "Prototype"],
  cover: "/projects/fraud-detection/cover.jpg",
  blocks: [
    {
      kind: "prose",
      heading: "General solution description",
      paragraphs: [
        "Our solution will be a mobile app that could automatically monitor any ongoing calls, emails, and texts. When fraudulent behavior is detected, it will send an alert to our users. Therefore, depending on likelihood of the calls, emails, and texts being real frauds, the alerts will be different. The alert output, thus, is a multi class classification of the overall confidence score of fraud detection.",
      ],
    },
    {
      kind: "table",
      caption: "Alert tiers by overall fraud confidence score.",
      columns: ["Confidence score", "Alert"],
      rows: [
        ["75–100", "Most likely a scam"],
        ["50–74", "Likely a scam"],
        ["25–49", "Likely not a scam"],
        ["0–24", "Most likely not a scam"],
      ],
      emphasize: [0],
    },
    {
      kind: "prose",
      paragraphs: [
        "If a call, text messages, or an email seems to most likely be a scam, we will send alerts to both our users and their family members. This warning will ignore any do-not-disturb settings, so even though they are on the call, they will still see the alert. If it is likely a scam, we will send them a notification to read the fraud analysis on our app. For likely not a scam and most likely not a scam, they won't receive any notification. However, for any calls, emails, and texts, there will be a fraud analysis generated by our app no matter the likelihood of scam.",
        "We will constantly post educational content on fraud prevention, explain new types of scams to enhance our users' ability to identify scams. We will also collect well known scam area codes and other data and specifically inform our users so that if for some reason our system doesn't warn them, they can have some background knowledge that for example a Montréal area code phone number could be a scam since the user is in a different province.",
      ],
    },
    {
      kind: "figure",
      heading: "Pipeline sequence flow chart",
      src: "/projects/fraud-detection/pipeline-flowchart.png",
      alt: "Flow chart of the training pipeline, from data collection and feature engineering through model training, validation, testing and deployment, to monitoring and maintenance.",
      width: 1768,
      height: 1002,
    },
    {
      kind: "prose",
      heading: "Pipeline sequence description",
      paragraphs: [
        "Our pipeline sequence, indicating how we train the solution, consists of 6 steps: data collection, feature engineering, model training, validation, testing and deployment, and monitoring and maintenance — in which steps 3 and 4 are iterative processes.",
        "We start off with collecting as many data as possible in 3 data formats (calls, text messages, and emails with pdf documents). We first convert these to text data, using speech recognition for calls and document intelligence for emails. We then handle missing values, remove stop words like \u201Cum\u201D and \u201Cthe\u201D, and of course correct errors.",
        "With the addition of labels indicating the likelihood of each file being a scam, we perform feature engineering. We have 5 features, where each one is a numeric value from 0 to 1, indicating confidence score. Our first feature is professional tone, which means how professional the text sounds. Some scammers tend to represent themselves with unprofessional manner, and that is why we decided to add this. To develop this feature, we customize the sentiment analysis code through Jupyter Notebook to ensure that the algorithm produces an output score of professional tone. Feature data 2, 3, 4 are gathered by utilizing named entity recognition to extract suspicious links, text referring to money, and text referring to personal information. The last feature is whether the text describes emergency or something too good to be true, such as winning a lottery, for example. We use default sentiment analysis to get the confidence score of how positive or negative the text is and key phrase extraction to summarize the text overall with a few words.",
        "We then normalize and split the data into training dataset and test dataset, which we would put into algorithm selected by Automated ML from Azure AI to train the model. The next step is a loop of grid search, essentially re-training based on the evaluation metrics until the evaluation result is more than satisfactory. Finally, following final evaluation, we develop API interfaces to integrate the model into production environment, in which we have additional steps to monitor the behavior of the model by collecting stats and user feedback and periodically retrain the model to apply user feedback and evolving fraud methods.",
      ],
    },
  ],
};

export const escapeFromMars: Project = {
  slug: "3d-game-escape-from-mars",
  title: "3D Game Project: Escape From Mars",
  summary:
    "A Unity FPS rebuilt from a sample microgame — new map, new assets, and a new objective built around collecting fuel rather than killing enemies.",
  period: "2023",
  org: "Personal project",
  tags: ["Unity", "C#", "Game Design", "OOP"],
  cover: "/projects/3d-game-escape-from-mars/gameplay-poster.jpg",
  blocks: [
    {
      kind: "prose",
      heading: "Overview",
      paragraphs: [
        'The "Escape From Mars" game I made from editing a pre existing sample 3D FPS game from Unity is based on a story, where an astronaut gets stuck on Mars and has to collect all fuel items to escape to Earth. However, there are robots that are holding it back…',
        "The original sample game was a game set with UI's, characters, visual effects, audio, and movements but lacked design and had killing all enemies as the objective. I edited and designed the map and added more characters and weapon assets from the unity store. Most importantly, I added fuel assets and changed the objective from \u201Ckilling all enemies\u201D to \u201Ccollecting all fuels\u201D.",
        "The full game project can be accessed on [c29park/3D-Game-EscapeFromMars](https://github.com/c29park/3D-Game-EscapeFromMars). The original sample game project can be accessed on [Unity FPS Microgame](https://assetstore.unity.com/packages/templates/fps-microgame-156015).",
      ],
    },
    {
      kind: "youtube",
      heading: "Gameplay",
      caption:
        "Playing through the level: the objective text reads “Find and collect all fuel” rather than the sample game's kill-all-enemies goal.",
      videoId: "v2DsKsLy6So",
      poster: "/projects/3d-game-escape-from-mars/gameplay-poster.jpg",
      duration: "2:29",
    },
    {
      kind: "prose",
      paragraphs: [
        "To re-code the game based on my overall game design, of which the objective is to have the user collect fuels, the main coding skills I employed were object-oriented programming and inheritance and polymorphism. For instance, for the fuel items I had to make a class for fuel items and have it inherit the class of items in general so that I could make it collectable like the healing items. I also edited the game manager and game objective scripts so that the game ended when all 3 fuel items were collected. Additionally, I made the game message pop up, informing the user of how many items there are to pick up to end the game.",
        "The most challenging part of this project was that I had to read all the relevant scripts and analyze them so that I could adjust the code according to my intentions. The non-coding and minor changes made for this game were editing the map, robot placements, and selecting types of robots to put to make the game challenging and entertaining. The robots were also all pre programmed assets that I imported from the unity store.",
      ],
    },
  ],
};

export const vexRobotics: Project = {
  slug: "vex-robotics",
  title: "VEX Robotics Competition",
  summary:
    "Four years on team 1010R, main coder for the 2022–2023 Spin Up season — a four-motor mecanum drivetrain with a tuned PD controller and odometry.",
  period: "2019–2023",
  org: "VEX Robotics Competition — Team 1010R",
  tags: ["C++", "Control Systems", "Odometry", "Robotics"],
  cover: "/projects/vex-robotics/section-robot.png",
  blocks: [
    {
      kind: "prose",
      heading: "Overview",
      paragraphs: [
        "Vex Robotics Competition is the largest robotics competition in the world, in which students compete as a team with a designated game objective. This page goes through the latest robotics project my team 1010R worked on for the 2022–2023 season game Spin Up. The game's main objective was to score discs on goals by shooting them. Additionally I was the main coder of my team.",
        "The GitHub repository for my team's robot's code is [c29park/VEX-Robotics-Project-Code-2022-2023](https://github.com/c29park/VEX-Robotics-Project-Code-2022-2023).",
      ],
    },
    {
      kind: "prose",
      heading: "General robot description",
      paragraphs: [
        "Comprised of the expansion system, the roller system, the intake system, the loader system, and the flywheel system, our 4-mecanum-wheel-motor-drive robot was quite functional in completing all game tasks. This section briefly goes over the parts of the robots.",
        'The codes for these robot parts will be available on the "src" folder of "rushSkills" in my GitHub repository.',
      ],
    },
    {
      kind: "figure",
      caption: "Robot frontal top view.",
      src: "/projects/vex-robotics/section-robot.png",
      alt: "Front-top view of the VEX robot, showing the metal frame, flex wheels and drivetrain.",
      width: 420,
      height: 387,
    },
    {
      kind: "prose",
      heading: "1. Intake system",
      paragraphs: [
        'To shoot the discs, we first had to collect them. The following image is the intake system we built. It used one motor to power the three "flex wheels" and the conveyor belt chained together to spin them simultaneously. The system would bring the discs up to the container tray.',
      ],
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/intake-system.png",
      alt: "The intake system: three flex wheels and a conveyor belt chained to a single motor.",
      width: 371,
      height: 425,
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/intake-system-detail.png",
      alt: "Closer view of the intake assembly.",
      width: 373,
      height: 186,
    },
    {
      kind: "prose",
      heading: "2. Roller system",
      paragraphs: [
        "The easiest way to score 10 points was to roll a roller against the wall to match the rolling cylinder's top color with the alliance team color. We used one motor to spin three flex wheels to score the roller and an optical sensor (located right below the flex wheels in the image) to identify the color of the bottom of the cylinder. The motor would stop when the optical sensor reads the opposite team's color since the team alliance color would be on the top.",
      ],
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/roller-system.png",
      alt: "The roller system: three flex wheels driven by one motor, with an optical sensor mounted below them.",
      width: 450,
      height: 416,
    },
    {
      kind: "prose",
      heading: "3. Expansion system",
      paragraphs: [
        "Each tile covered by the robot during the last 10 seconds of the match was worth 3 points, and there were no size regulations at the time. We had strings stored in the 4 boxes, each of which are made of 2 C-channels, and loaded to shoot them across the field to cover the tiles. Pneumatic pistons, powered by the release of pressured air from the pneumatic tank, were used to release the elastics connected to the strings inside the box.",
      ],
    },
    {
      kind: "figure",
      caption: "Top view.",
      src: "/projects/vex-robotics/expansion-top-view.png",
      alt: "Top view of the expansion system, showing four C-channel boxes holding loaded strings.",
      width: 423,
      height: 209,
    },
    {
      kind: "figure",
      caption: "Pneumatic pistons.",
      src: "/projects/vex-robotics/pneumatic-pistons.png",
      alt: "Pneumatic pistons mounted on the robot, connected to the pressurized air tank.",
      width: 396,
      height: 387,
    },
    {
      kind: "prose",
      heading: "4. Flywheel system",
      paragraphs: [
        "To shoot the discs, we span with one motor the two black flex wheels at 3400 rpm at the minimum so that the 3 loaded discs could travel as projectiles simultaneously reaching the goal. During the driver mode, to be aware of when the flex wheels are spinning at the desired range of speed, we buzzed the controller when the motor's velocity was at 430 rpm. We also had a pusher mechanism powered by one motor to push the discs up to where they would be in contact with the flywheel system to be launched.",
      ],
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/flywheel-system.png",
      alt: "The flywheel: two black flex wheels driven by a single motor.",
      width: 198,
      height: 126,
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/flywheel-detail-1.png",
      alt: "Closer view of the flywheel assembly on the robot.",
      width: 254,
      height: 315,
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/flywheel-detail-2.png",
      alt: "The disc pusher mechanism feeding discs into the flywheel.",
      width: 326,
      height: 276,
    },
    {
      kind: "prose",
      heading: "5. Four-motor mecanum wheel drivetrain",
      paragraphs: [
        "Mecanum wheels are special wheels designed so that they allow the robot to move horizontally. Coding them was more challenging than coding regular omni wheels. For accurate turning and determining the heading of the robot, an inertial sensor was installed on the center of the robot so that it could be used in conjunction with the drivetrain.",
        "Both sides of the drivetrain has a tracking wheel linked to an encoder in between the two wheels. Another is located at the back of the robot. Encoders ensure that the program knows how much distance the robot travelled, which allows for knowing the robot's position and an accurate movement and stopping.",
      ],
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/mecanum-drivetrain.png",
      alt: "The four-motor mecanum wheel drivetrain with tracking wheels and encoders.",
      width: 427,
      height: 378,
    },
    {
      kind: "prose",
      heading: "PD controller",
      paragraphs: [
        "The PD loop task is what I have been working on for almost 2 years to make the robot's movement performance the closest to perfect. For accurate stopping at a desired position, I coded the PD thread for the autonomous mode and tuned them by obtaining the Kp and Kd values from a PD auto-tuner I customized using MATLAB and its tutorial for building the circuit for auto-tuning.",
        'The program for the auto-tuner can be accessed from [c29park/VEX-Robotics-PDAutoTuning](https://github.com/c29park/VEX-Robotics-PDAutoTuning). The code for the PD loop, function calls, and functions will be available on "autons.cpp" from the "src" folder of "rushSkills" in my VEX project GitHub repository.',
      ],
    },
    {
      kind: "figure",
      heading: "PD thread",
      src: "/projects/vex-robotics/pd-thread-code.png",
      alt: "Snippet of the main PD controller function, resetting encoders, averaging wheel positions, computing error and derivative, and setting motor voltage.",
      width: 1647,
      height: 1739,
    },
    {
      kind: "prose",
      paragraphs: [
        'The following image is a snippet of the main PD controller function code. This function runs in a loop when the boolean variable "enableDrivePD" is true. Suppose the robot needs to travel straight 12 inches on the field. The motors\' and the encoders\' sensor values will be reset to 0 degrees at the start, and the positions of the tracking wheels and the 4 mecanum wheels\' will be updated constantly.',
        "Then, we determine the average position by taking the average of all position values. The error is the distance between the robot's current average position and the robot's desired position, in this case 12 inch point from the start. The derivative is the rate of change of the error, and using both derivative and error the motor power in voltage is calculated. Finally, the program spins the drivetrain motors and updates the prevError value.",
      ],
    },
    {
      kind: "prose",
      heading: "MATLAB PD auto-tuner",
      paragraphs: [
        "For tuning my PD loop (i.e. determining the correct values for both Kp and Kd), I followed the tutorial of how to make a PID auto tuner to build the following diagram and customized it so that the closed loop PID outputs only the Proportional and Derivative values. I had to run this program individually for all four motors and get the average of Kp's and Kd's values. When the conversion rate is close to 100%, I would read the Kp and Kd values and stop the program immediately.",
        "The tutorial is [How to Automatically Tune PID Controllers](https://www.mathworks.com/videos/how-to-automatically-tune-pid-controllers-1600850427273.html).",
      ],
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/matlab-autotuner.png",
      alt: "MATLAB Simulink block diagram of the closed-loop PID auto-tuner, customized to output only proportional and derivative values.",
      width: 600,
      height: 153,
    },
    {
      kind: "prose",
      heading: "Odometry",
      paragraphs: [
        "To help identify the proper location of the robot on the field, I needed odometry. Although I couldn't apply pure pursuit algorithm to the actual code so that I could use it for robot movements, the coordinates, which were printed on the controller screen helped me plan the route of the robot during autonomous mode.",
        'Odometry is used with the tracking wheel\'s encoder values. The full version of the odometry code is available on the "src" folder of "LeftAuto" in my GitHub repository.',
      ],
    },
    {
      kind: "figure",
      heading: "Odometry derivation",
      caption:
        "The robot: circle = center of the robot, rectangle = tracking wheel with encoder.",
      src: "/projects/vex-robotics/odometry-robot-diagram.png",
      alt: "Line diagram of the robot showing the centre point and three tracking wheels: left, right, and back.",
      width: 252,
      height: 254,
    },
    {
      kind: "code",
      // Two substitution slips in the original Wix write-up are corrected here:
      // the right-wheel line read `𝚫R/𝛉 = r - SL` (should be SR), and the x-axis
      // result read `2(𝚫B/𝛉 + SL)` (should be SB — SB was defined and then
      // never used). The conclusions on both lines were already right.
      text: `Let SR = distance from the robot's center to the right tracking wheel
Let SL = distance from the robot's center to the left tracking wheel
Let SB = distance from the robot's center to the back tracking wheel

Assume the robot travelled in an arc. Let 𝛉 be the angle formed at the
centre of the circle, r the radius, 𝚫L the arc length travelled by the
left tracking wheel and 𝚫R the arc length travelled by the right one.

    𝚫L = (r + SL)𝛉            𝚫R = (r - SR)𝛉

    𝚫L/𝛉 = r + SL     ⇒   r = 𝚫L/𝛉 - SL
    𝚫R/𝛉 = r - SR     ⇒   r = 𝚫R/𝛉 + SR

    𝚫L/𝛉 - SL = 𝚫R/𝛉 + SR
    𝚫L - SL𝛉  = 𝚫R + SR𝛉     ⇒   𝚫L - 𝚫R = 𝛉(SL + SR)

    𝛉 = (𝚫L - 𝚫R)/(SL + SR)

Use the cosine law:

    y² = r² + r² - 2r·r·cos𝛉 = 2r²(1 - cos𝛉)
    y² = 4r²((1 - cos𝛉)/2)    ⇒   y = 2r·sqrt((1 - cos𝛉)/2)

Since sin(𝛉/2) = sqrt((1 - cos𝛉)/2),   y = 2r·sin(𝛉/2)
Since r = 𝚫R/𝛉 + SR,                   y = 2(𝚫R/𝛉 + SR)·sin(𝛉/2)

The same theory applies on the x axis in terms of the back tracking
wheel. Let 𝚫B be the arc travelled by the back tracking wheel:

    𝚫B = (r - SB)𝛉    ⇒   r = 𝚫B/𝛉 + SB

    x = 2(𝚫B/𝛉 + SB)·sin(𝛉/2)

So there we go. If we know the distances travelled by the tracking
wheels and the heading by inertial sensor, we can track our position
for the robot.`,
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/odometry-arc-derivation.png",
      alt: "Geometric diagram of the robot travelling along an arc, showing the radius, the angle theta, and the arc lengths of the left and right tracking wheels.",
      width: 580,
      height: 486,
    },
    {
      kind: "figure",
      heading: "Odometry code",
      src: "/projects/vex-robotics/odometry-code.png",
      alt: "The positionTracking task, computing X and Y field coordinates from encoder values and printing them to the controller and brain screens.",
      width: 600,
      height: 311,
    },
    {
      kind: "prose",
      paragraphs: [
        "This code is based upon the math derivation that I showed above. Although the logic for deltaR described in the section above is used for deltaR in the code, it doesn't change what it does. The right tracking wheel's encoder value had to be reversed because the ports were reversed in configuration.",
        'The "positionTracking" task not only calculates the X, Y coordinates on the field, but it also prints the X Y values on the controller screen and the brain screen with a live diagram of the robot\'s movement on the field. For the values of X Y printed on the controller, they are not exact because the values are updated every 50 ticks of the encoders.',
      ],
    },
    {
      kind: "prose",
      heading: "Volunteering for VRC tournaments",
      paragraphs: [
        "I had been volunteering for robotics tournaments for 3 years, generally serving as the tournament director and the head referee for tournaments specifically designed for middle school and elementary.",
      ],
    },
    {
      kind: "figure",
      src: "/projects/vex-robotics/volunteering.webp",
      alt: "A VEX Robotics Competition tournament in progress.",
      width: 696,
      height: 392,
    },
  ],
};
