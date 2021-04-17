import React, { useCallback, useMemo } from 'react';

// connnect Redux and action for redux reducer
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/index";

// import child components
import NavProgress from "../shared/navProgress/navProgress";
import MainHeader from "../shared/mainHeader/mainHeader";
import SecondaryHeader from "../shared/secondaryHeader/secondaryHeader";
import Input from "../UI/input/input";
import PhoneInput from "../UI/phoneInput/phoneInput";
import Button from "../UI/button/button";

// import checkValidityfunction
import checkValidity from "../utility/checkValidity";

// import validityCriteria
import validityCriteria from "../utility/validityCriteria";

const ContactData = (props) => {

    const contactState = useSelector( state => state.contactDataReducer.generalInputs )
    const phoneState = useSelector( state => state.contactDataReducer.phone )
    const dispatch = useDispatch();
    console.log(contactState)

    const inputChangedHandler = useCallback((event, inputIdentifier) => {
        let value = event.target.value
        let valid = checkValidity(value, validityCriteria[inputIdentifier]) // check if specific field is valid 
        dispatch(actions.update_input(inputIdentifier, value, valid)) 
    }, [dispatch])


    const phoneChangeHandler = useCallback((value) => {
        let actualValue = value.value 
        let valid = checkValidity(actualValue, validityCriteria["phone"] )
        dispatch(actions.update_input("phone", actualValue, valid))
    }, [dispatch])

    const configInputs = {
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Zadajte Vaše meno",
                label: "Meno"
            }
        },
        surname: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Zadajte Vaše priezvisko",
                label: "Vaše priezvisko"
            }
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Zadajte Váš e-mail",
                label: "E-mailová adresa"
            }
        }
    }

    const formElementArray = [];
    for (let key in contactState) {
        formElementArray.push({
            id: key,
            config: contactState[key]
        });
    }
    
    let inputs = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementConfig={configInputs[formElement.id].elementConfig}
                changed={(event) => inputChangedHandler(event, formElement.id)}
                isValid={formElement.config.valid}
                touched={formElement.config.touched}
                label={configInputs[formElement.id].elementConfig.label}
                required={true}
                value={formElement.config.value} /> 
    ));

    const buttonBackProperties = useMemo(() => {
        return {
            className: "Back",
            value: "Späť",
            notAllowed: false
        }
    }, [])

    let continueCondition = contactState.name.valid && contactState.email.valid && contactState.surname.valid

    const continueBtnProperties = useMemo(() => {
        let continueBtnProperties = null;
        if (continueCondition) {
            continueBtnProperties = {
                value: "Pokračovať",
                className: "Enabled",
            }
        } else {
            continueBtnProperties = {
                className: "Disabled",
                value: "Pokračovať",
            }
        }
        return continueBtnProperties
    }, [continueCondition]) // this element re-create only when specific input validity change, it's avoid on re-creating button on every render


    const phoneInput = useMemo(() => {
        return <PhoneInput changed={value => phoneChangeHandler({value})} value={phoneState.value} isValid={phoneState.valid} touched={phoneState.touched} />
    }, [phoneState, phoneChangeHandler])

    return(
        <div className="ContactData" >
            <NavProgress />
            <MainHeader value="Potrebujeme od Vás zopár informácií" />
            <SecondaryHeader value="O Vás" />
            {inputs}
            {phoneInput}
            <div style={{ display: "flex", justifyContent: "space-between", margin: "68px 0 0 0" }} >
                <Button url="/" buttonProperties={buttonBackProperties} />
                <Button url="/checkout" buttonProperties={continueBtnProperties} disabled={!continueCondition} />
            </div>
        </div>
    );
};

export default ContactData;

