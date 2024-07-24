const ctrlWrapper = (ctrl) => {
    return (req, res, next) => {
        ctrl(req, res).cath((err) => next(err));
    };
};

export default ctrlWrapper;
