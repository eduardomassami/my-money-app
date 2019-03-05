import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field , formValueSelector} from 'redux-form'

import { init } from './billingCycleActions'
import LabelAndInput from '../common/form/labelAndInput'
import CreditList from './creditList'

class BillingCycleFrom extends Component {
    render() {
        const { handleSubmit, readOnly, credits } = this.props
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe um nome' />
                    <Field name='month' component={LabelAndInput} readOnly={readOnly}
                        type='number' label='Mês' cols='12 4' placeholder='Informe o mês' />
                    <Field name='year' component={LabelAndInput} readOnly={readOnly}
                        type='number' label='Ano' cols='12 4' placeholder='Informe o ano' />
                    <CreditList cols='12 6' list={credits} readOnly={readOnly} />
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCycleFrom = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleFrom)
const selector = formValueSelector('billingCycleForm')
const mapStateToProps = state => ({credits: selector(state, 'credits')})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleFrom)