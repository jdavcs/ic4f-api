This is the code I wrote for my Ph.D. dissertation at the University of Maryland. It is primarily
large-scale text reuse detection with basic sentiment analysis. It was used to construct a large
data set containing press releases and related news coverage and analyze the relationship between
these two groups. The results of the data analysis were used to challenge an existing social
scientific theory. 

## What this code does

**Dataset size:** There were two studies: Ph.D. research + a follow-up study.
The first study analyzed **54,000+** documents, the second one analyzed **126,000+** documents. 

Some of the the data collection and processing steps included:
- crawl a predetermined set of websites and extract relevant data from online newsrooms 
- extract news articles from LexisNexis bulk downloads
- tokenize the corpus; identify instances of matching sequences of n tokens appearing in a press
  release and one or more news articles
- eliminate bad discriminators (non-unique token sequences appearing in more than one press release - 
  i.e., corporate boilerplate doesn't help identify a relationship between a release and an
  article)
- run a sentence tokenizer + part-of-speech tagger; then attempt to match each token against a
  subjectivity lexicon; calculate document subjectivity and polarity scores 
-  ...and many more routine and ad-hoc data cleaning and processing tasks


## Text reuse detection
One of the goals of the study was to determine to what extent news articles borrow their content
from press releases. To explore this, we need a large dataset containing press releases and related
news articles. This code constructs such a dataset by discovering text sequences appearing in both
the press release and the article. Figure 1 (below) displays a sample of such matching sequences.

<div class="screenshots">
  <img class="img-fluid noborder" src="/static/projects/phd/matches.png">
  <p align="center">Figure 1. Displaying matching text sequences between release and article</p>
</div>


## Basic sentiment analysis
To identify evaluative language, I used a subjectivity lexicon consisting of 8,221 terms, marked
with their part of speech tag and measures of subjectivity and polarity. For example, the term ***weak***
is marked as an adjective with negative polarity, whereas the term ***best***, occurring as any part of
speech, is marked as positive. My code ran a sentence and a word tokenizer and a part-of-speech
tagger on the corpus, after which it attempted to match each token in the corpus to a term from the
subjectivity lexicon. Successful matches were used to calculate document subjectivity and polarity
scores (see Figure 2). 

<div class="screenshots">
  <img class="img-fluid" src="/static/projects/phd/sentanalysis1.png"> 
  <p align="center">Figure 2. Calculating document subjectivity and polarity</p>
</div>

## Related
* My dissertation is <a target="_blank" href="https://drum.lib.umd.edu/handle/1903/14638">available here</a>
* A browsable HTML version of the constructed dataset (including all identified instances of text
  reuse + extracted quotes) is <a target="_blank" href="http://sergey.cs.uni.edu/phd">available here</a> 
  (<a target="_blank" href="http://sergey.cs.uni.edu/phd/matches/37.html">Here's a sample</a>)
* Here's my <a target="_blank" href="http://sergey.cs.uni.edu/phd/defense.pdf">dissertation defense slide deck</a>
* Here's <a target="_blank" href="http://sergey.cs.uni.edu/phd/fellowship.pdf">another slide deck</a> from a follow-up study on a larger data set
