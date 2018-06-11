The <a href="https://catalog.ldc.upenn.edu/ldc2015t03" target="_blank">Avocado Research Email Collection</a> 
is a corpus of emails and attachments (2 million items), distributed by the Linguistic Data
Consortium for use in research and development in e-discovery, social network analysis, and related
fields. The emails and attachments come from 282 accounts of a defunct information technology
company referred to as "Avocado". The collection consists of the processed personal folders (PST
files) of these accounts with metadata describing folder structure, email characteristics and
contacts, among others. It is expected to be useful for social network analysis, e-discovery and
related fields. 

I was hired to build the collection at the E-Discovery Lab in the University of Maryland. I worked
closely with William Webber, Mossaab Bagdouri, and Douglas Oard. My work primarily included:

* Developing the processing pipeline - from designing its architecture to implementing the system;
* Designing the XML-based format for the collection's metadata (EDRM XML was insufficient due to the
  amount and variety of extracted metadata);
* Preparing the data for distribution; 
* Developing a web-based system to visually explore the collection's data and its relationships,
  create labeled subsets of the data, and generate custom distribution sets based on selected
  criteria (attachment MIME types, file extensions, PST item types).

The main data processing stages included the following:
1. PST file extraction (initial size of the dataset: 282 PST files, 66G)
1. File deduplication
1. Email thread reconstruction
1. MIME-type identification
1. Archive extraction
1. Text extraction
1. Redaction of sensitive data
1. Generating the distribution data files

**Technology:** The system was written mostly in Python with some Bash (to glue things together) and
Java (for extracting text and metadata from attachments with Apache Tika). It relied heavily on the
libpst library for extracting PST files. The web-based admin system was written in PHP and
JavaScript + HTML/CSS. MySQL was used as the database.  

**Sample extracted data** is available on <a href="https://github.com/ic4f/pluto/tree/master/demo"
target="_blank">GitHub</a> (along with the source code). The data used for this demo is a subset of the **EDRM Enron Email Data Set** (see attribution below).

## Published dataset
* Douglas Oard, William Webber, David Kirsch, and Sergey Golitsynskiy. 2015. <a href="https://catalog.ldc.upenn.edu/ldc2015t03" target="_blank">Avocado Research Email Collection</a>. LDC2015T03. DVD. Philadelphia: Linguistic Data Consortium. (2015).
* <a href="https://catalog.ldc.upenn.edu/docs/LDC2015T03/README.txt" target="_blank">Documentation describing the collection and the format</a>

## Screenshots of the web-based UI
These are screenshots of the system loaded with sample data. The PST files used as the source for
this demo are part of the EDRM Enron Email Data Set that has been produced in EML, PST and NSF
format by [ZL Technologies, Inc.](http://www.zlti.com) This Data Set is licensed under a [Creative
Commons Attribution 3.0 United States License](http://creativecommons.org/licenses/by/3.0/us/). The
files have been obtained from [Nuix](https://www.nuix.com) and are part of the [cleansed
version](https://www.nuix.com/edrm-enron-data-set/edrm-enron-data-set) of the data set.

<div class="screenshots">
  <img class="img-fluid" src="/static/projects/avocado/all.png">
  <img class="img-fluid" src="/static/projects/avocado/emails.png">
  <img class="img-fluid" src="/static/projects/avocado/attachment.png">
  <img class="img-fluid" src="/static/projects/avocado/details1.png">
  <img class="img-fluid" src="/static/projects/avocado/details2.png">
  <img class="img-fluid" src="/static/projects/avocado/subset.png">
</div>


