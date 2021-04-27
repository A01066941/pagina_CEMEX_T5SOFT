import { Route } from 'react-router-dom';

class RegularRoute extends Route {
    render() {
        document.title =
            'CEMEX' +
            (this.props.title === undefined ? '' : ` – ${this.props.title}`);
        console.log('RENDERED ROUTE ' + this.props.title);
        return super.render();
    }
}

export default RegularRoute;
