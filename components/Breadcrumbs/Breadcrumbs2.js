import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { withStyles } from "@material-ui/core/styles";
import ChevronRight from "mdi-material-ui/ChevronRight";
import Link from "components/Link";
import SharedPropTypes from "lib/utils/SharedPropTypes";

const styles = (theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    maxWidth: theme.layout.mainContentMaxWidth,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  },
  breadcrumbLink: {
    fontSize: "14px",
    fontFamily: theme.typography.fontFamily,
    fontWeight: '600',
    color: theme.palette.colors.main,
    border: 0,
    textDecoration: "underline",
  },
  breadcrumbIcon: {
    fontSize: "14px"
  }
});

class Breadcrumbs extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isPDP: PropTypes.bool,
    isTagGrid: PropTypes.bool,
    product: PropTypes.object,
    tagId: PropTypes.string,
    tags: PropTypes.arrayOf(SharedPropTypes.tag),
    isCategory: PropTypes.bool,
    categoryName: PropTypes.string
  }

  renderTagBreadcrumbPiece(tag) {
    const { classes: { breadcrumbIcon, breadcrumbLink }, tags } = this.props;

    // Find first tag that is a parent of this tag, if any are
    const parentTag = tags.find((node) => node.subTagIds.includes(tag._id));

    return (
      <Fragment>
        {!!parentTag && this.renderTagBreadcrumbPiece(parentTag)}
        <ChevronRight className={breadcrumbIcon} />
        <Link route={`/tag/${tag.slug}`}><span className={breadcrumbLink}>{tag.name}</span></Link>
      </Fragment>
    );
  }

  renderTagBreadcrumbs() {
    const { tagId, tags } = this.props;

    if (!tagId || !Array.isArray(tags) || tags.length === 0) return null; // still loading

    const currentTag = tags.find((tag) => tag._id === tagId);
    if (!currentTag) {
      throw new Error(`Unable to find current tag with ID ${tagId}`);
    }

    return this.renderTagBreadcrumbPiece(currentTag);
  }

  renderProductNameBreadcrumb = () => {
    const { classes: { breadcrumbIcon, breadcrumbLink }, product, tagId } = this.props;

    if (tagId) {
      return (
        <Fragment>
          {this.renderTagBreadcrumbs()}
          <ChevronRight className={breadcrumbIcon} />
          <Link route={`/product/${product.slug}`}><span className={breadcrumbLink}>{product.title}</span></Link>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <ChevronRight className={breadcrumbIcon} />
        <Link route={`/product/${product.slug}`}><span className={breadcrumbLink}>{product.title}</span></Link>
      </Fragment>
    );
  }

  renderCategoryNameBreadcrumb = () => {
    const { classes: { breadcrumbIcon, breadcrumbLink }, categoryName } = this.props;
    return (
      <Fragment>
        <ChevronRight className={breadcrumbIcon} />
        <span>{categoryName}</span>
      </Fragment>
    );
  }

  renderBreadcrumbs() {
    const { isPDP, isTagGrid, isCategory } = this.props;

    if (isTagGrid) {
      return this.renderTagBreadcrumbs();
    }

    if (isPDP) {
      return this.renderProductNameBreadcrumb();
    }

    if (!!isCategory) {
      return this.renderCategoryNameBreadcrumb();
    }

    return null;
  }

  render() {
    const { classes: { container, breadcrumbLink } } = this.props;

    return (
      <div className={container}>
        <Link route="/"><span className={breadcrumbLink}>Home</span></Link>
        {this.renderBreadcrumbs()}
      </div>
    );
  }
}

export default withStyles(styles)(inject("tags")(Breadcrumbs));
