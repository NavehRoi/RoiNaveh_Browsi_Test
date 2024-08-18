const express = require('express');
const router = express.Router();

let data = [
  {
    publisher: 'publisher 1',
    domains: [
      {
        domain: "bla.com",
        desktopAds: 5,
        mobileAds: 3
      },
      {
        domain: "bla1.com",
        desktopAds: 2,
        mobileAds: 30
      }
    ]
  },
  {
    publisher: 'publisher 2',
    domains: [
      {
        domain: "gar.com",
        desktopAds: 0,
        mobileAds: 4
      },
      {
        domain: "gar.com",
        desktopAds: 5,
        mobileAds: 3
      }
    ]
  }
];

//Gets all publishers
router.get('/publishers', (req, res) => {
  res.json(data);
});

//Add new publisher
router.post('/publishers', (req, res) => {
  const publisherName = req.query.publisherName;
  if (publisherName) {
    const newPublisher = {
      publisher: publisherName,
      domains: []
    };
    
    data.push(newPublisher);
    res.status(201).json(newPublisher);
  } else {
    res.status(400).json({ message: 'Invalid publisher data' });
  }
});


// Get all domains
router.get('/domains', (req, res) => {
  const domains = data.flatMap(publisher => publisher.domains);
  res.json(domains);
});


// Create a new domain
router.post('/domains', (req, res) => {
  const { selectedPublisherIndex, domain } = req.body; 
  const publisher = data[selectedPublisherIndex]

  //Checking if the name is unique
  let flag = isDomainNameUnique(domain.domain, "") ;
  if( flag == -1){
    if (publisher) {
      publisher.domains.push(domain);
      res.status(201).json(domain);
    } else {
      res.status(404).json({ message: `This domain is already configured on publisher ${flag + 1}` });
    }
  } 
});


// Update a specific domain
router.post('/updateDomain', (req, res) => {
    let updated = false;
    const { domain , domainCurrentName} = req.body;

    for (let publisher of data) {
      const domainIndex = publisher.domains.findIndex(d => d.domain === domainCurrentName);
      if (domainIndex !== -1) {
        let flag = isDomainNameUnique(domain.domain, domainCurrentName);
        if( flag == -1){
          publisher.domains[domainIndex] = {
            domain: domain.domain,
            desktopAds:  domain.desktopAds,
            mobileAds:  domain.mobileAds
          };
          res.status(201).json(domain);
          updated = true;
          break;

        } else{
          res.status(409).json({ message: `This domain is already configured on publisher ${flag + 1}` });
        }
      }
    }

    if (!updated) {
      res.status(404).json({ message: 'Domain not found' });
    }
  });


//function to check if The domain name is unique
function isDomainNameUnique(newDomainName, currentDomainName) {
  for (let i = 0; i < data.length; i++) {
    let publisher = data[i];
    for (let domain of publisher.domains) {
      //Making sure the current name has change
      if (domain.domain === newDomainName && domain.domain !== currentDomainName) {
        return i; // The name is not unique
      }
    }
  }
  return -1; // The name is unique
}


// Delete a specific domain
router.delete('/domains/:domain', (req, res) => {
  let deleted = false;
  
  for (let publisher of data) {
    const domainIndex = publisher.domains.findIndex(d => d.domain === req.params.domain);
    if (domainIndex !== -1) {
      publisher.domains.splice(domainIndex, 1);
      deleted = true;
      break;
    }
  }

  if (deleted) {
    res.json({ message: 'Domain deleted' });
  } else {
    res.status(404).json({ message: 'Domain not found' });
  }
});


module.exports = router;