import React from "react";
import PropTypes from "prop-types";

import AdminLayout from "./AdminLayout";

/**
 * Renders the AdminInternalLayout component.
 *
 * @param {Component} Component - The component to render.
 * @param {string} title - The title of the layout.
 * @param {...otherProps} otherProps - Other props to pass to the component.
 * @return {ReactElement} - The rendered component.
 */


const AdminInternalLayout = ({ Component, title, ...otherProps }) => (

    <>

        <AdminLayout>

            <Component {...otherProps} />
        </AdminLayout>

    </>
);

AdminInternalLayout.propTypes = {
    Component: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func,
        PropTypes.object,
    ]).isRequired,
    otherProps: PropTypes.objectOf(PropTypes.object),
    title: PropTypes.string,
};

AdminInternalLayout.defaultProps = {
    otherProps: {},
    title: "Dashboard",
};

export default AdminInternalLayout;
