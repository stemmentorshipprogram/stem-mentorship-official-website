const mongoose = require('mongoose');
const Download = require('../models/Download');

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stem-mentorship';

async function populateDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Sample data
    const sampleFiles = [
      {
        fileId: 'math-guide',
        fileName: 'Math Guide.pdf',
        subject: 'math',
        category: 'Math',
        filePath: 'resources/math/Math_Guide.pdf',
        downloadCount: 0
      },
      {
        fileId: 'science-guide',
        fileName: 'Science Guide.pdf',
        subject: 'science',
        category: 'Science',
        filePath: 'resources/science/Science_Reference_Guide.pdf',
        downloadCount: 0
      },
      {
        fileId: 'english-guide',
        fileName: 'English Guide.pdf',
        subject: 'english',
        category: 'English',
        filePath: 'resources/english/English_1.pdf',
        downloadCount: 0
      },
      {
        fileId: 'iq-logical-reasoning',
        fileName: 'Logical Reasoning Tests.pdf',
        subject: 'iq',
        category: 'Logical Reasoning',
        filePath: 'resources/iq/logical-reasoning.pdf',
        downloadCount: 0
      }
    ];

    // Clear existing data
    await Download.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    for (const file of sampleFiles) {
      await Download.create(file);
      console.log(`Added: ${file.fileName}`);
    }

    console.log('Database populated successfully');
    process.exit(0);

  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

populateDatabase();
