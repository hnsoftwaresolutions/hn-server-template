'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');
const chai = require('chai');
const sinonChai = require('sinon-chai');

describe(
    'src',
    function () {
        describe(
            'app',
            function () {
                let app;
                let expect;
                let expressStub;
                let expressUseSpy;

                before(function () {
                    expect = chai.expect;
                    chai.use(sinonChai);
                });

                beforeEach(function () {
                    expressUseSpy = sinon.stub();
                    expressStub = sinon.stub()
                        .returns({
                            name: 'expressStub',
                            use: expressUseSpy
                        });

                    app = proxyquire(
                        '../../src/app.js',
                        {
                            express: expressStub,
                            './instances': {
                                helmetInstance: 'helmetInstance',
                                expressRateLimitInstance: 'expressRateLimitInstance'
                            }
                        }
                    );
                });

                afterEach(function () {
                    sinon.restore();
                    sinon.reset();
                });

                it(
                    'should call express once with no parameters',
                    function () {
                        expect(expressStub)
                            .to
                            .have
                            .been
                            .calledOnceWithExactly();
                    }
                );

                it(
                    'should call express.use with helmet instance',
                    function () {
                        expect(expressUseSpy)
                            .to
                            .have
                            .been
                            .calledWithExactly('helmetInstance');
                    }
                );

                it(
                    'should call express.use with express rate limit instance',
                    function () {
                        expect(expressUseSpy)
                            .to
                            .have
                            .been
                            .calledWithExactly('expressRateLimitInstance');
                    }
                );

                it(
                    'should export correct data',
                    function () {
                        expect(app.name)
                            .to
                            .equal('expressStub');
                    }
                );
            }
        );
    }
);
