var express = require('express');
const { route } = require('.');
var router = express.Router();
var Country = require('../model/CountryV1');
var State = require('../model/StateV1');
// list countries in acending order
router.get('/list-countries-ascending-order', async (req,res,next)=> {
    try {
        const countries = await Country.find({}).sort({name : 1});
        res.status(200).json({countries})
    } catch (error) {
        next(error);
    }
});
// list countries in descending order
router.get('/list-countries-descending-order', async (req,res,next)=> {
    try {
        const countries = await Country.find({}).sort({name : -1});
        res.status(200).json({countries})
    } catch (error) {
        next(error);
    }
});
// create Country
router.post('/', async (req,res,next)=> {
    req.body.ethinicity = req.body.ethinicity.split(',');
    try {
        const addedCountry = Country.create(req.body);
        res.status(200).json({addedCountry});
    } catch (error) {
        next(error);
    }
})
// veiw individual country in detailed
router.get('/:id', async (req,res,next)=> {
    const id = req.params.id;
    try {
        const country = await Country.findById(id);
        res.status(200).json({country});
    } catch (error) {
        next(error);
    }
})
// update country by adding neighbouring countries
router.put('/:id/add-neighboring-countries', async (req,res,next)=> {
    const id = req.params.id;
    const neighbouringCountry = req.body.name;
    try {
        const neighbourCountryData = await Country.findOne({name :neighbouringCountry});
        if(neighbourCountryData){
            const updatedCountry = await Country.findByIdAndUpdate(id, {$push : {"neighbouring_countires" : id}});
            res.status(200).json({updatedCountry});
        }else {
            next();
        }
        res.status(200).json({neighbourCountryData,updatedCountry});
    } catch (error) {
        next(error);
    }
});
// update country
router.put('/:id', async (req,res,next)=> {
    const id = req.params.id;
    req.body.ethinicity = req.body.ethinicity.split(',');

    try {
        const updatedCountry = await Country.findByIdAndUpdate(id,req.body);
        res.status(200).json({updatedCountry});
    } catch (error) {
        next(error);
    }
});
//delete Country
router.delete('/:id', async (req,res,next)=> {
    const id = req.params.id;
    try {
        const deletedcountry = await Country.findByIdAndDelete(id);
        res.status(200).json({deletedcountry});
    } catch (error) {
        next(error);
    }
});
// add states in the country
router.put('/:id/add-states', async (req,res,next)=> {
    const id = req.params.id;
    const state = req.body.name;
    try {
        const verifyState = await State.findOne({name: state});
        if(verifyState){
            const updatedCountryWithState = await Country.findByIdAndUpdate(id, {$push : {"states": verifyState.id}});
            res.status(200).json({updatedCountryWithState})
        } else {
            next();
        }
    } catch (error) {
        next(error)
    }
});

// list all states of countries in ascending
router.get('/:id/list-all-states-in-ascending', async (req,res,next)=> {
    const id = req.params.id;
    try {
        const populatedCountry = await Country.findById(id).populate("states");
        const allStates = populatedCountry.states;
        allStates = allStates.sort({name : 1})
        res.status(200).json({allStates});
    } catch (error) {
        next(error);
    }
});

// list all states of countries descending order
router.get('/:id/list-all-states-in-descending', async (req,res,next)=> {
    const id = req.params.id;
    try {
        const populatedCountry = await Country.findById(id).populate("states");
        const allStates = populatedCountry.states;
        allStates = allStates.sort({name : -1})
        res.status(200).json({allStates});
    } catch (error) {
        next(error);
    }
});

// for a particular country, list all neighbouring countires
router.get('/:id/all-neighbouring-countries', async (req,res,next)=> {
    const id = req.params.id;
    try {
        const populatedData = await Country.findById(id).populate("neighbouring_countires");
        const neighbourCountryData = populatedData.neighbouring_countires;
        res.status(200).json({neighbourCountryData});
    } catch (error) {
        next(error);
    }
});

// list all religions present in entire country dataset.
router.get('/list-all-religions', async (req,res,next)=> {
    try {
        const allReligions = await Country.find({} , "ethinicity");
        const uniqueReliginArray = allReligions.reduce((acc,cv)=> {
            if(!acc.includes(cv)){
                acc.push(cv);
            }
            return acc;
        },[])
    } catch (error) {
        next(error)
    }
})


module.exports = router;
