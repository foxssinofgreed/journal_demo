var mongoose = require('mongoose');
var marked = require('marked');
var slugify = require('slugify');
var createDomPurify = require('dompurify');
var { JSDOM } = require('jsdom');
var dompurify = createDomPurify(new JSDOM().window)

var articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    mark_down: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.mark_down) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.mark_down));
    }

    next();
});

module.exports = mongoose.model('Article', articleSchema);