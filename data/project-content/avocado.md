The Avocado Research Email Collection is a corpus of emails and attachments (2 million items),
distributed by the Linguistic Data Consortium for use in research and development in e-discovery,
social network analysis, and related fields. The emails and attachments come from 282 accounts of a
defunct information technology company referred to as "Avocado". The collection consists of the
processed personal folders (PST files) of these accounts with metadata describing folder structure,
email characteristics and contacts, among others. It is expected to be useful for social network
analysis, e-discovery and related fields. 

I was hired to build the collection at the E-Discovery Lab in the University of Maryland. I worked
closely with William Webber, Mossaab Bagdouri, and Douglas Oard. My work included developing the
processing pipeline, designing the xml-based format for the collection's metadata, and preparing the
data for distribution. 

The main data processing stages included the following:
1. PST file extraction (initial size of the dataset: 282 PST files, 66G)
1. File deduplication
1. Email thread reconstruction
1. MIME-type identification
1. Archive extraction
1. Text extraction
1. Redaction of sensitive data
1. Preparing the distribution

**Technology:** The system was written mostly in Python with some Bash (to glue things together) and
Java (for extracting text and metadata from attachments with Apache Tika). It relied heavily on the
libpst library for extracting PST files. MySQL was used as the database The system also included a
web-based admin interface for exploring the dataset, written in PHP and JavaScript.

## Published dataset
* Douglas Oard, William Webber, David Kirsch, and Sergey Golitsynskiy. 2015. <a href="https://catalog.ldc.upenn.edu/ldc2015t03" target="_blank">Avocado Research Email Collection</a>. LDC2015T03. DVD. Philadelphia: Linguistic Data Consortium. (2015).
* <a href="https://catalog.ldc.upenn.edu/docs/LDC2015T03/README.txt" target="_blank">Documentation describing the collection and the format</a>

